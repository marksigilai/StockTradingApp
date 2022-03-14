from network import QuoteServer
from datetime import datetime

import config

def start_buy(user_id, stock, amount):
    #query accounts db for amount of money
    amount_query = '' + user_id
    amount_result = amount_query
    if amount_result < amount:
        return None

    #if sufficient, place buy in trans history to wait for commit buy
    update_trans_query = '' + user_id + stock + amount
    result_update = update_trans_query
    return result_update


def commit_buy(user_id):
    #query for user id buy within 60 seconds
    recent_buy_query = ''+user_id+datetime.now()
    recent_buy_result = recent_buy_query

    #if not exists, return
    if not recent_buy_result:
        return None

    #check if user already has the stock
    already_exists_query = ''+user_id+recent_buy_result#['stock']
    already_exists_result = already_exists_query
    
    #update accounts db with updated stock amount
    update_query = ''+user_id+recent_buy_result
    update_result = update_query

    #create transaction log
    trans_log_query = ''+user_id
    trans_log_result = trans_log_query

    return update_result

def cancel_buy(user_id):
    #query for user id buy within 60 seconds
    recent_buy_query = ''+user_id+datetime.now()
    recent_buy_result = recent_buy_query

    #if not exists, return
    if not recent_buy_result:
        return None

    #create a transaction log
    trans_log_query = ''+user_id
    trans_log_result = trans_log_query

    return "Success"
