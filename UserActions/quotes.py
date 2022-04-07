import network
import config

import sys

logs_db = config.collection.logs

def get_quote(user_id, stock):
    #Given a user id, query the accounts database for the account info
    # request = "{} {}".format(user_id, stock)
    # result = network.send_request(request)
    result = 3.21

    log_result = logs_db.insert_one({
        'id': user_id,
        'stock': {'name': stock, 'amount': 0},
        'quote': result #might want to split this into fields
    })
    # return result.split(',')
    result = {
        'userid': user_id,
        'stock': stock,
        'quote': result
    }
    return result

def num_of_stocks(user_id, stock, amount):
    # stock_quote = get_quote(user_id, stock)
    # num_stocks = amount/stock_quote
    # return num_stocks
    return amount/5
    