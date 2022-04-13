import network
import config
import time
from pymongo import ReturnDocument

import sys

log_db = config.collection.logs

def find_user_account(user_id):
    #Given a user id, query the accounts database for the account info
    result = config.collection.accounts.find_one(
        {'id': user_id}
    )

    response = {
        "balance": result.get("amount")
    }
    print(response)
    return response

def get_user_stocks(user_id):
    result = config.collection.accounts.find_one(
        {'id': user_id},
        projection={'stocks': True, '_id': False}
    )
    return result

def add_funds(user_id, amount):
    result = config.collection.accounts.find_one_and_update(
        {'id': user_id}, 
        {'$inc': {'amount': amount}},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )
    if 'stocks' not in result.keys():
        #creating account for the first time, must add stocks: []
        result = config.collection.accounts.find_one_and_update(
            {'id': user_id},
            {'$set': {'stocks': []}},
            upsert=True,
            return_document=ReturnDocument.AFTER
        )
    print("The result is --> ", result)
    timestamp = time.time()
    log_result = log_db.insert_one({
        'id': user_id,
        'action': 'ADD',
        'amount': amount,
        'timestamp': timestamp
    })
    return result

def remove_funds(user_id, amount):
    if amount > 0:
        amount *= -1
    result = config.collection.accounts.find_one_and_update(
        {'id': user_id}, 
        {'$inc': {'amount': amount}},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )
    timestamp = time.time()
    log_result = log_db.insert_one({
        'id': user_id,
        'action': 'REMOVE',
        'amount': amount,
        'timestamp': timestamp
    })
    return result

# add_funds('xyz', 100)