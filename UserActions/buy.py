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

"""
Prerequisites:
- Account must already exist for user_id
"""

def start_buy(user_id, stock, amount):
    # print("start buy")
    amt_result = accounts_db.find_one(
        {'id': user_id},
        projection={'_id': False, 'amount': True}
    )
    # print(amt_result)
    if not amt_result:
        return {"err" : "Account does not exist"}

    existing_amount = float(amt_result['amount'])
    if existing_amount < amount:
        return {"err": "Cannot buy {} of stock {}".format(amount, stock)}

    #if sufficient, place buy in trans history to wait for commit buy
    num_stocks = quotes.num_of_stocks(user_id, stock, amount)

    timestamp = time.time()
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'BUY',
        'stock': {'name': stock, 'amount': num_stocks},
        'amount': amount,
        'timestamp': timestamp
        }
    )
    return {'status':'passed'}


def commit_buy(user_id):

    timestamp = time.time()
    time_min_60 = timestamp - 60
    #query for user id buy within 60 seconds
    log_result = log_db.find_one(
        {"$and": [
            {'id': user_id}, 
            {"$or": [
                {'action': 'BUY'}, 
                {'action': 'COMMIT_BUY'}, 
                {'action': 'CANCEL_BUY'}
            ]},
            {"timestamp": {"$gt": time_min_60}}
        ]},
        sort=[('timestamp', pymongo.DESCENDING)]
    )


    if not log_result:
        return {"err": "No recent buy action for user {}".format(user_id)}
    action = log_result['action']
    if action != 'BUY': 
        return {"err" : "Latest transaction was not buy (cancel or commit)"}
    stock = log_result['stock']
    amount = log_result['amount']

    update_accounts_result = accounts_db.find_one_and_update(
        {'id': user_id},
        {'$inc': {'stocks.$[stockName].amount': stock['amount']}},
        array_filters=[{'stockName.name': stock['name']}]
    )
    # print(update_accounts_result)
    if stock['name'] not in [d['name'] for d in update_accounts_result['stocks']]:
       #need to insert stock because this is user's first buy of this stock
       print("first buy of stock "+stock['name'])
       update_accounts_result = accounts_db.find_one_and_update(
           {'id': user_id},
           {'$addToSet': {'stocks': {'name': stock['name'], 'amount': stock['amount']}}}
       )
    remove_res = accounts.remove_funds(user_id, amount)

    log_result1 = log_db.insert_one(
        {'id': user_id, 
        'action': 'COMMIT_BUY',
        'stock': {'name': stock['name'], 'amount': stock['amount']},
        'amount': amount,
        'timestamp': timestamp
        }
    )

    return {'status':'passed'}

def cancel_buy(user_id):
    timestamp = time.time()
    time_min_60 = timestamp - 60
    #query for user id buy within 60 seconds
    log_result = log_db.find_one(
        {"$and": [
            {'id': user_id}, 
            {"$or": [
                {'action': 'BUY'}, 
                {'action': 'COMMIT_BUY'}, 
                {'action': 'CANCEL_BUY'}
            ]},
            {"timestamp": {"$gt": time_min_60}}
        ]},
        sort=[('timestamp', pymongo.DESCENDING)]
    )

    if not log_result:
        #no recent buy action for this user
        return {"err": "No recent buy for user {}".format(user_id)}

    action = log_result['action']
    if action != 'BUY': 
        # return {"err": "Latest transaction was cancel"}
        return {"err": "Latest transaction not a buy??"}
    stock = log_result['stock']
    amount = log_result['amount']

    log_result1 = log_db.insert_one(
        {'id': user_id,
        'action': 'CANCEL_BUY',
        'stock': {'name': stock['name'], 'amount': stock['amount']},
        'amount': amount,
        'timestamp': timestamp
        }
    )
    return {'status':'passed'}

# start_buy('xyz', 'stock1', 10)
# print(commit_buy('xyz'))

# start_buy('xyz', 'stock2', 20)
# print(cancel_buy('xyz'))