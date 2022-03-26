import config
import network
import quotes
import json
import time

triggers_db = config.collection.triggers
accounts_db = config.collection.accounts
log_db = config.collection.logs

#Thread to watch stock quotes for triggers

def get_all_triggers():
    triggers = triggers_db.find()
    return triggers

def quote_stock(user_id, stock):
    result = quotes.get_quote(user_id, stock)
    stock_price = float(result[0])

    return stock_price

#Delayed infinite loop to periodically check triggers and quote triggered stocks
while(1):

    #get all triggers
    triggers_result = get_all_triggers()
    triggers_users = [x['id'] for x in triggers_result]
    triggers_stocks = [x['stock']['name'] for x in triggers_result]

    #loop through users and triggers
    for trigger in triggers_result:
        curr_stock_price = quote_stock(real_user, trigger_stock)
        trigger_user = trigger['id']
        real_user = trigger_user.split('_')[0] #assumes no '_' in user id
        trigger_stock = trigger['stock']
        trigger_cash_amount = trigger['amount']
        trigger_amount = trigger['trigger_amount']
        trigger_type = trigger['type']
        
        if trigger_type == "BUY" and trigger_amount >= curr_stock_price:
            #buy the set amount of the stock
            update_accounts_result = accounts_db.update_one(
                {'id': real_user, 'stock.name': trigger_stock['name']},
                {'$inc': {'stock.$.amount': trigger_stock['amount']}}
            )
            if not update_accounts_result:
                #stock didn't exist
                #create a stock entry for that user
                pass
            #no need to adjust orig account's amount
            #adjust orig account's amount of the trigger_stock
            trigger_amount_dec = -1*trigger_cash_amount
            update_amount_result = accounts_db.update_one(
                {'id': real_user},
                {'$inc': {'amount': trigger_amount_dec}}
            )
            #delete trigger 
            trigger_del_result = triggers_db.delete(
                {"$and": [
                    {'id': trigger_user},
                    {'type': 'BUY'},
                    {'stock.$.name': trigger_stock['name']}
                ]}
            )
            #delete secondary account
            account_del_result = accounts_db.delete(
                {'id': trigger_user} #trigger_user is unique per stock and user
            )

            #record log
            timestamp = time.time()
            log_result = log_db.insert_one({
                'id': real_user,
                'action': 'TRIGGER_BUY',
                'stock': [{'name': trigger_stock, 'amount': trigger_stock['amount']}],
                'amount': trigger_cash_amount,
                'trigger_amount': trigger_amount,
                'timestamp': timestamp
            })

        elif trigger_type == "SELL" and trigger_amount <= curr_stock_price:
            #sell the set amount of the stock
            cash_amount_sold = curr_stock_price * trigger_stock['amount']
            #no need to adjust orig account's stock amount
            #adjust orig account's cash amount
            update_accounts_result = accounts_db.update_one(
                {'id': real_user, 'stock.name': trigger_stock['name']},
                {'$inc': {'amount': cash_amount_sold}}
            )
            #delete trigger
            trigger_del_result = triggers_db.delete(
                {"$and": [
                    {'id': trigger_user},
                    {'type': 'SELL'},
                    {'stock.$.name': trigger_stock['name']}
                ]}
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
                'stock': [{'name': trigger_stock, 'amount': trigger_stock['amount']}],
                'amount': trigger_cash_amount,
                'trigger_amount': trigger_amount,
                'timestamp': timestamp
            })
            

        else:
            #should never get here
            continue

    time.sleep(60)
