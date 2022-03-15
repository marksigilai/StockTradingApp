import network
import config

import sys

def get_quote(user_id, stock):
    #Given a user id, query the accounts database for the account info
    request = "{} {}".format(user_id, stock)
    result = network.send_request(request)
    return result

def num_of_stocks(user_id, stock, amount):
    stock_quote = get_quote(user_id, stock)
    num_stocks = amount/stock_quote
    return num_stocks
    