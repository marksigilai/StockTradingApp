import network
import time
import json
import pymongo
import config
import quotes
import accounts
from pymongo import ReturnDocument

log_db = config.collection.logs
accounts_db = config.collection.accounts
triggers_db = config.collection.triggers

def set_sell_amount(user_id, stock, stock_amount):
    trigger_user_id = user_id+'_selltrigger_'+stock

    stock_result = accounts_db.find_one(
        {"$and": [
            {'id': user_id}
        ]},
        projection={'_id': False, 'stocks': True}
    )
    print(stock_result)
    existing_stocks = None
    for s in stock_result['stocks']:
        if stock == s['name']:
            existing_stocks = s['amount']
    if not existing_stocks or existing_stocks < stock_amount:
        return "Not sufficient stocks to sell"

    check_triggers_result = accounts_db.find_one(
        {'id': trigger_user_id}
    )
    print(check_triggers_result)
    if check_triggers_result:
        print("duplicate trigger")
        return "cannot create duplicate trigger"

    trigger_result = triggers_db.insert_one({
        'id': trigger_user_id,
        'stock': {'name': stock, 'amount': stock_amount},
        'amount': 0,
        'trigger_amount': 0,
        'type': 'SELL'
    })

    timestamp = time.time()
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'SET_SELL_AMOUNT',
        'stock': {'name': stock, 'amount': stock_amount},
        'amount': 0,
        'timestamp': timestamp
        }
    )
    return {'status':'passed'}

def set_sell_trigger(user_id, stock, trigger_amount):
    trigger_user_id = user_id+'_selltrigger_'+stock

    if trigger_amount <= 0:
        return "Must set positive trigger amount"

    #find one and update with trigger_amount, use to find set amount
    update_result = triggers_db.find_one_and_update(
        {'id': trigger_user_id},
        {'$inc': {'trigger_amount': trigger_amount}},
        return_document=ReturnDocument.AFTER
    )

    if not update_result:
        return "Error: no previous set sell amount when trigger set"

    set_amt = update_result['stock']['amount']

    #create reserve account
    stock_update_result = accounts_db.insert_one({
        'id': trigger_user_id,
        'amount': 0,
        'stock': {'name': stock, 'amount': set_amt}
    })
    dec_stock = -1*set_amt

    #reduce user account for given stock
    update_accounts_result = accounts_db.update_one(
        {'id': user_id},
        {'$inc': {'stocks.$[stockName].amount': dec_stock}},
        array_filters=[{'stockName.name': stock}]
    )

    #record log
    timestamp = time.time()
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'SET_SELL_TRIGGER',
        'stock': {'name': stock, 'amount': 0},
        'amount': trigger_amount,
        'timestamp': timestamp
        }
    )

    return {'status':'passed'}

def cancel_set_sell(user_id, stock):
    trigger_user_id = user_id+'_selltrigger_'+stock
    #query for user id in triggers_db
    trigger_result = triggers_db.find_one_and_delete(
        {'id': trigger_user_id}
    )
    if trigger_result is None:
        return {'status':'nothing to cancel'}
    set_amount = trigger_result['stock']['amount']
    trigger_amount = trigger_result['trigger_amount']
    
    #add stocks back in
    if trigger_amount != 0:
        update_accounts_result = accounts_db.update_one(
            {'id': user_id},
            {'$inc': {'stocks.$[stockName].amount': set_amount}},
            array_filters=[{'stockName.name': stock}]
        )
        delete_trigger_account = accounts_db.delete_one(
            {'id': trigger_user_id}
        )

    #record log
    timestamp = time.time()
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'CANCEL_SET_BUY',
        'stock': {'name': stock, 'amount': set_amount},
        'amount': trigger_amount,
        'timestamp': timestamp
        }
    )

    return {'status':'passed'}

# set_sell_amount('xyz', 'stock1', 1)
# set_sell_trigger('xyz', 'stock1', 2)
# cancel_set_sell('xyz', 'stock1')