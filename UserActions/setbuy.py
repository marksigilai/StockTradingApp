import network
import time
import json
import pymongo
import config
import quotes
import accounts

log_db = config.collection.logs
accounts_db = config.collection.accounts
triggers_db = config.collection.triggers

def set_buy_amount(user_id, stock, amount):
    trigger_user_id = user_id+'_buytrigger_'+stock

    amt_result = accounts_db.find_one(
        {'id': user_id},
        projection={'_id': False, 'amount': True}
    )
    existing_amount = amt_result['amount']
    if existing_amount < amount:
        return {"err" :"Cannot buy {} of stock {}".format(amount, stock)}

    check_triggers_result = accounts_db.find_one(
        {'id': trigger_user_id}
    )
    print(check_triggers_result)
    if check_triggers_result:
        print("duplicate trigger")
        return {"err": "cannot create duplicate trigger"}

    #(a) a reserve account is created for the BUY transaction to hold 
    #   the specified amount in reserve for when the transaction is 
    #   triggered 
    add_funds_result = accounts.add_funds(trigger_user_id, amount)

    #(b) the user's cash account is decremented by the specified amount 
    remove_funds_result = accounts.remove_funds(user_id, amount)

    #(c) when the trigger point is reached the user's stock account is 
    # updated to reflect the BUY transaction.
    # Add to triggers db to poll from
    trigger_result = triggers_db.insert_one({
        'id': trigger_user_id,
        'stock': {'name': stock, 'amount': 0},
        'amount': amount,
        'trigger_amount': 0,
        'type': 'BUY'
    })

    #record log
    timestamp = time.time()
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'SET_BUY_AMOUNT',
        'stock': {'name': stock, 'amount': 0},
        'amount': amount,
        'timestamp': timestamp
        }
    )
    return {'status':'passed'}

def set_buy_trigger(user_id, stock, trigger_amount):
    trigger_user_id = user_id+'_buytrigger_'+stock

    #find one and update with trigger_amount, use to find set amount
    update_result = triggers_db.update_one(
        {"$and": [
            {'id': trigger_user_id},
            {'type': 'BUY'}
        ]},
        {'$inc': {'trigger_amount': trigger_amount}}
    )

    if update_result.matched_count == 0:
        return {"err": "Error: no previous set buy amount when trigger set"}

    #record log
    timestamp = time.time()
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'SET_BUY_TRIGGER',
        'stock': {'name': stock, 'amount': 0},
        'trigger_amount': trigger_amount,
        'timestamp': timestamp
        }
    )

    return {'status':'passed'}

def cancel_set_buy(user_id, stock):
    trigger_user_id = user_id+'_buytrigger_'+stock
    #query for user id in triggers_db
    trigger_result = triggers_db.find_one_and_delete(
        {"$and": [
            {'id': trigger_user_id},
            # {'stock.name': stock},
            {'type': 'BUY'}
        ]}
    )
    set_amount = trigger_result['amount']
    trigger_amount = trigger_result['trigger_amount']
    add_result = accounts.add_funds(user_id, set_amount)

    trigger_account_result = accounts_db.find_one_and_delete(
        {'id': trigger_user_id}
    )

    #record log
    timestamp = time.time()
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'CANCEL_SET_BUY',
        'stock': {'name': stock, 'amount': 0},
        'trigger_amount': trigger_amount,
        'timestamp': timestamp
        }
    )

    return {'status':'passed'}

# set_buy_amount('xyz', 'stock1', 10)
# set_buy_amount('xyz', 'stock1', 10)
# set_buy_trigger('xyz', 'stock1', 3)