
import network
from datetime import datetime
import json
import time
import pymongo

import config
import quotes

log_db = config.collection.logs
accounts_db = config.collection.accounts

def start_sell(user_id, stock, amount):
    stock_result = accounts_db.find_one(
        {"$and": [
            {'id': user_id},
            {'stock.name': stock}
        ]},
        projection={'_id': False, 'stock': True}
    )
    existing_num_stock = float(json.loads(stock_result)['amount'])
    requested_num_stock = quotes.num_of_stocks(user_id, stock, amount)
    if requested_num_stock > existing_num_stock:
        return "Cannot sell {} of stock {}".format(amount, stock)

    timestamp = time.time()

    #if sufficient, place sell in trans history to wait for commit sell
    log_result = log_db.insert_one(
        {'id': user_id, 
        'action': 'SELL',
        'stock': [{'name': stock, 'amount': requested_num_stock}],
        'amount': amount,
        'timestamp': timestamp
        }
    )
    return log_result


def commit_sell(user_id):
    timestamp = time.time()
    #query for user id sell within 60 seconds
    log_result = json.loads(log_db.find_one(
        {"$and": [
            {'id': user_id}, 
            {"$or": [
                {'action': 'SELL'}, 
                {'action': 'COMMIT_SELL'}, 
                {'action': 'CANCEL_SELL'}
            ]}        
        ]},
    ).sort('timestamp', pymongo.DESCENDING))

    action = log_result['action']
    if action != 'SELL': 
        return "Latest transaction was not sell (cancel or commit)"
    stock = log_result['stock']
    amount = log_result['amount']
    old_timestamp = float(log_result['timestamp'])

    if not log_result or old_timestamp > timestamp + 60:
        #no recent sell action for this user
        return "No recent sell for user {}".format(user_id)

    update_accounts_result = accounts_db.update_one(
        {'id': user_id, 'stock.name': stock['name']},
        {'$inc': {'stock.$.amount': -1*float(stock['amount'])}}
    )

    log_result1 = log_db.insert_one(
        {'id': user_id, 
        'action': 'COMMIT_SELL',
        'stock': [{'name': stock['name'], 'amount': stock['amount']}],
        'amount': amount,
        'timestamp': timestamp
        }
    )
    return log_result1

def cancel_sell(user_id):
    timestamp = time.time()
    #query for user id sell within 60 seconds
    log_result = json.loads(log_db.find_one(
        {"$and": [
            {'id': user_id}, 
            {"$or": [
                {'action': 'SELL'}, 
                {'action': 'COMMIT_SELL'}, 
                {'action': 'CANCEL_SELL'}
            ]}
        ]},
    ).sort('timestamp', pymongo.DESCENDING))

    action = log_result['action']
    if action != 'SELL': 
        return "Latest transaction was cancel"
    stock = log_result['stock']
    amount = log_result['amount']
    old_timestamp = float(log_result['timestamp'])

    if not log_result or old_timestamp > timestamp + 60:
        #no recent sell action for this user
        return "No recent sell for user {}".format(user_id)

    log_result1 = log_db.insert_one(
        {'id': user_id, 
        'action': 'CANCEL_SELL',
        'stock': [{'name': stock['name'], 'amount': stock['amount']}],
        'amount': amount,
        'timestamp': timestamp
        }
    )
    return log_result1

