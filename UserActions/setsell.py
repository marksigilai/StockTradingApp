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
    trigger_user_id = user_id+'_trigger_'+stock

    existing_stocks = accounts.get_user_stocks(user_id, stock)['amount']
    if existing_stocks < stock_amount:
        return "Not sufficient stocks to sell"

    trigger_result = triggers_db.insert_one({
        'id': trigger_user_id,
        'stock': [{'name': stock, 'amount': stock_amount}],
        'amount': 0,
        'trigger_amount': 0,
        'type': 'SELL'
    })

    timestamp = time.time()
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'SET_SELL_AMOUNT',
        'stock': [{'name': stock, 'amount': stock_amount}],
        'amount': 0,
        'timestamp': timestamp
        }
    )
    return log_result

def set_sell_trigger(user_id, stock, trigger_amount):
    trigger_user_id = user_id+'_trigger_'+stock

    #find one and update with trigger_amount, use to find set amount
    update_result = triggers_db.find_one_and_update(
        {"$and": [
            {'id': trigger_user_id},
            {'type': 'SELL'}
        ]},
        {'$inc': {'trigger_amount': trigger_amount}},
        return_document=ReturnDocument.AFTER
    )

    if update_result.matchedCount == 0:
        return "Error: no previous set sell amount when trigger set"

    set_amt = update_result.stock['amount']

    #create reserve account
    res_acct = accounts.add_funds(trigger_user_id, 0)
    stock_update_result = accounts_db.insert_one({
        'id': trigger_user_id,
        'amount': 0,
        'stock': [{'name': stock, 'amount': set_amt}]
    })
    dec_stock = -1*set_amt

    #reduce user account for given stock
    update_accounts_result = accounts_db.update_one(
        {'id': user_id, 'stock.name': stock['name']},
        {'$inc': {'stock.$.amount': dec_stock}}
    )

    #record log
    timestamp = time.time()
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'SET_SELL_TRIGGER',
        'stock': [{'name': stock, 'amount': 0}],
        'trigger_amount': trigger_amount,
        'timestamp': timestamp
        }
    )

    return log_result

def cancel_set_sell(user_id, stock):
    trigger_user_id = user_id+'_trigger_'+stock
    #query for user id in triggers_db
    trigger_result = triggers_db.find_one_and_delete(
        {"$and": [
            {'id': trigger_user_id},
            {'stock.name': stock},
            {'type': 'SELL'}
        ]}
    )
    set_amount = trigger_result['stock']['amount']
    trigger_amount = trigger_result['trigger_amount']
    
    #add stocks back in
    update_accounts_result = accounts_db.update_one(
        {'id': user_id, 'stock.name': stock['name']},
        {'$inc': {'stock.$.amount': set_amount}}
    )

    #record log
    timestamp = time.time()
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'CANCEL_SET_BUY',
        'stock': [{'name': stock, 'amount': set_amount}],
        'trigger_amount': trigger_amount,
        'timestamp': timestamp
        }
    )

    return log_result