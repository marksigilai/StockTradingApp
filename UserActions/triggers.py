import config
import network
import quotes
import json
import time
import pymongo

triggers_db = config.collection.triggers
accounts_db = config.collection.accounts
log_db = config.collection.logs

#Thread to watch stock quotes for triggers

def get_all_triggers():
    triggers = triggers_db.find().sort('timestamp', pymongo.DESCENDING)
    return triggers

def quote_stock(user_id, stock):
    result = quotes.get_quote(user_id, stock)
    stock_price = result #may be array in future

    return stock_price


#Delayed infinite loop to periodically check triggers and quote triggered stocks
while(1):

    #get all triggers
    triggers_result = get_all_triggers()
    
    #loop through users and triggers
    for trigger in triggers_result:
        # print(trigger)
        trigger_user = trigger['id']
        real_user = trigger_user.split('_')[0] #assumes no '_' in user id
        trigger_stock = trigger['stock']
        trigger_cash_amount = trigger['amount']
        trigger_amount = trigger['trigger_amount']
        trigger_type = trigger['type']
        curr_stock_price = quote_stock(real_user, trigger_stock)
        
        if trigger_type == "BUY" and trigger_amount >= curr_stock_price:
            # print("BUY trigger")
            #no need to adjust orig account's cash amount
            #just adjust orig account's amount of the trigger_stock
            update_accounts_result = accounts_db.find_one_and_update(
                {'id': real_user},
                {'$inc': {'stocks.$[stockName].amount': trigger_stock['amount']}},
                array_filters=[{'stockName.name': trigger_stock['name']}]
            )
            #if the user doesn't already own the stock, the above $inc won't work
            if trigger_stock['name'] not in [d['name'] for d in update_accounts_result['stocks']]:
                # print("first buy of stock "+trigger_stock['name'])
                update_accounts_result = accounts_db.find_one_and_update(
                    {'id': real_user},
                    {'$addToSet': {'stocks': {'name': trigger_stock['name'], 'amount': trigger_stock['amount']}}}
                )
            
            #delete trigger 
            trigger_del_result = triggers_db.delete_one(
                {'id': trigger_user}
            )
            #delete secondary account
            account_del_result = accounts_db.delete_one(
                {'id': trigger_user} #trigger_user is unique per stock and user
            )

            #record log
            timestamp = time.time()
            log_result = log_db.insert_one({
                'id': real_user,
                'action': 'TRIGGER_BUY',
                'stock': {'name': trigger_stock, 'amount': trigger_stock['amount']},
                'amount': trigger_cash_amount,
                'trigger_amount': trigger_amount,
                'timestamp': timestamp
            })

        elif trigger_type == "SELL" and trigger_amount <= curr_stock_price:
            # print("SELL trigger")
            #sell the set amount of the stock
            cash_amount_sold = curr_stock_price * trigger_stock['amount']
            #no need to adjust orig account's stock amount
            #adjust orig account's cash amount
            update_accounts_result = accounts_db.update_one(
                {'id': real_user},
                {'$inc': {'amount': cash_amount_sold}}
            )
            #delete trigger
            trigger_del_result = triggers_db.delete(
                {'id': trigger_user}
            )
            #delete secondary account
            account_del_result = accounts_db.delete(
                {'id': trigger_user} #trigger_user is unique per stock and user
            )
            #record log
            timestamp = time.time()
            log_result = log_db.insert_one({
                'id': real_user,
                'action': 'TRIGGER_SELL',
                'stock': {'name': trigger_stock, 'amount': trigger_stock['amount']},
                'amount': trigger_cash_amount,
                'trigger_amount': trigger_amount,
                'timestamp': timestamp
            })
            

        else:
            #should never get here
            continue

    time.sleep(60)
