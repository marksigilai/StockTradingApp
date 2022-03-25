import network
from datetime import datetime
import json
import time
import pymongo

import config
import quotes

log_db = config.collection.logs
accounts_db = config.collection.accounts

def start_buy(user_id, stock, amount):
    amt_result = accounts_db.find_one(
        {'id': user_id},
        projection={'_id': False, 'amount': True}
    )
    existing_amount = float(json.loads(amt_result)['amount'])
    if existing_amount < amount:
        return "Cannot buy {} of stock {}".format(amount, stock)

    num_stocks = quotes.num_of_stocks(user_id, stock, amount)
    timestamp = time.time()

    #if sufficient, place buy in trans history to wait for commit buy
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'BUY',
        'stock': [{'name': stock, 'amount': num_stocks}],
        'amount': amount,
        'timestamp': timestamp
        }
    )
    return log_result


def commit_buy(user_id):
    timestamp = time.time()
    #query for user id buy within 60 seconds
    log_result = json.loads(log_db.find_one(
        {"$and": [
            {'id': user_id}, 
            {"$or": [
                {'action': 'BUY'}, 
                {'action': 'COMMIT_BUY'}, 
                {'action': 'CANCEL_BUY'}
            ]}        
        ]},
    ).sort('timestamp', pymongo.DESCENDING))

    action = log_result['action']
    if action != 'BUY': 
        return "Latest transaction was not buy (cancel or commit)"
    stock = log_result['stock']
    amount = log_result['amount']
    old_timestamp = float(log_result['timestamp'])

    if not log_result or old_timestamp > timestamp + 60:
        #no recent buy action for this user
        return "No recent buy for user {}".format(user_id)

    update_accounts_result = accounts_db.update_one(
        {'id': user_id, 'stock.name': stock['name']},
        {'$inc': {'stock.$.amount': stock['amount']}}
    )

    log_result1 = log_db.insert_one(
        {'id': user_id, 
        'action': 'COMMIT_BUY',
        'stock': [{'name': stock['name'], 'amount': stock['amount']}],
        'amount': amount,
        'timestamp': timestamp
        }
    )
    return log_result1

def cancel_buy(user_id):
    timestamp = time.time()
    #query for user id buy within 60 seconds
    log_result = json.loads(log_db.find_one(
        {"$and": [
            {'id': user_id}, 
            {"$or": [
                {'action': 'BUY'}, 
                {'action': 'COMMIT_BUY'}, 
                {'action': 'CANCEL_BUY'}
            ]}
        ]},
    ).sort('timestamp', pymongo.DESCENDING))

    action = log_result['action']
    if action != 'BUY': 
        return "Latest transaction was cancel"
    stock = log_result['stock']
    amount = log_result['amount']
    old_timestamp = float(log_result['timestamp'])

    if not log_result or old_timestamp > timestamp + 60:
        #no recent buy action for this user
        return "No recent buy for user {}".format(user_id)

    log_result1 = log_db.insert_one(
        {'id': user_id, 
        'action': 'CANCEL_BUY',
        'stock': [{'name': stock['name'], 'amount': stock['amount']}],
        'amount': amount,
        'timestamp': timestamp
        }
    )
    return log_result1

