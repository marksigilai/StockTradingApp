import network
import config
from pymongo import ReturnDocument

import sys

def find_user_account(user_id):
    #Given a user id, query the accounts database for the account info
    result = config.collection.accounts.find_one(
        {'id': user_id}
    )
    return result

def get_user_stocks(user_id, stock=''):
    if stock:
        result = config.collection.accounts.find_one(
            {'$and': [{'id': user_id}, {'stock.$.name': stock}]},
            projection={'stocks': True, '_id': False}
        )
    else:
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
    return result

add_funds('abcdef', 100)