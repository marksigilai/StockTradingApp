
import network
from datetime import datetime
import json
import time
import pymongo

import config
import accounts
import quotes

log_db = config.collection.logs
accounts_db = config.collection.accounts

def start_sell(user_id, stock, amount):
    stock_result = accounts_db.find_one(
        {"$and": [
            {'id': user_id}
        ]},
        projection={'_id': False, 'stocks': True}
    )
    print(stock_result)
    existing_stock = None
    for s in stock_result['stocks']:
        if stock == s['name']:
            existing_stock = s
    if not existing_stock:
        return {"err":"User does not have stock {}".format(stock)}
    existing_num_stock = existing_stock['amount']
    # requested_num_stock = quotes.num_of_stocks(user_id, stock, amount)
    if amount > existing_num_stock:
        return {"err": "Cannot sell {} of stock {}, only {}".format(amount, stock, existing_num_stock)}

    timestamp = time.time()

    #quote price * num stocks to sell
    add_fund_amount = quotes.get_quote(user_id, stock).get("quote")*amount 

    #if sufficient, place sell in trans history to wait for commit sell
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'SELL',
        'stock': {'name': stock, 'amount': amount},
        'amount': add_fund_amount,
        'timestamp': timestamp
        }
    )
    return {'status':'passed'}


def commit_sell(user_id):
    timestamp = time.time()
    time_min_60 = timestamp - 60
    #query for user id sell within 60 seconds
    log_result = log_db.find_one(
        {"$and": [
            {'id': user_id}, 
            {"$or": [
                {'action': 'SELL'}, 
                {'action': 'COMMIT_SELL'}, 
                {'action': 'CANCEL_SELL'}
            ]},
            {"timestamp": {"$gt": time_min_60}}
        ]},
        sort=[('timestamp', pymongo.DESCENDING)]
    )

    if not log_result:
        #no recent sell action for this user
        return {"err": "No recent sell for user {}".format(user_id)
}
    action = log_result['action']
    if action != 'SELL': 
        return {"err": "Latest transaction was not sell (cancel or commit)"}
    stock = log_result['stock']
    amount = log_result['amount']

    update_accounts_result = accounts_db.find_one_and_update(
        {'id': user_id},
        {'$inc': {'stocks.$[stockName].amount': -1*stock['amount']}},
        array_filters=[{'stockName.name': stock['name']}]
    )
    # print(update_accounts_result)
    add_funds_res = accounts.add_funds(user_id, amount)

    log_result1 = log_db.insert_one(
        {'id': user_id, 
        'action': 'COMMIT_SELL',
        'stock': [{'name': stock['name'], 'amount': stock['amount']}],
        'amount': amount,
        'timestamp': timestamp
        }
    )
    return {'status':'passed'}

def cancel_sell(user_id):
    timestamp = time.time()
    time_min_60 = timestamp - 60
    #query for user id sell within 60 seconds
    log_result = log_db.find_one(
        {"$and": [
            {'id': user_id}, 
            {"$or": [
                {'action': 'SELL'}, 
                {'action': 'COMMIT_SELL'}, 
                {'action': 'CANCEL_SELL'}
            ]},
            {"timestamp": {"$gt": time_min_60}}
        ]},
        sort=[('timestamp', pymongo.DESCENDING)]
    )

    if not log_result:
        #no recent sell action for this user
        return "No recent sell for user {}".format(user_id)

    action = log_result['action']
    if action != 'SELL':
        return "Latest transaction was cancel"
    stock = log_result['stock']
    amount = log_result['amount']

    log_result1 = log_db.insert_one(
        {'id': user_id, 
        'action': 'CANCEL_SELL',
        'stock': {'name': stock['name'], 'amount': stock['amount']},
        'amount': amount,
        'timestamp': timestamp
        }
    )
    return {'status':'passed'}

# start_sell('xyz', 'stock1', 3)
# print(commit_sell('xyz'))

# start_sell('xyz', 'stock1', 1)
# print(cancel_sell('xyz'))