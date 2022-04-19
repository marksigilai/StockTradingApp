import network
import config
import requests
import sys

logs_db = config.collection.logs
URL = "http://quoteserver:7000"


def get_quote(user_id, stock):
    #Given a user id, query the accounts database for the account info
    # request = "{} {}".format(user_id, stock)
    # result = network.send_request(request)
    # result = 3.21
    PARAMS = {'userid': user_id, 'symbol':stock}

    r = requests.get(url = URL, params = PARAMS)
    print("the data obtianed from the quote  request s --->", r)
    data = r.json()

    log_result = logs_db.insert_one({
        'id': user_id,
        'stock': {'name': stock, 'amount': 0},
        'quote': data['price']
    })
    # return result.split(',')
    result = {
        'userid': user_id,
        'stock': stock,
        'quote': data['price']
    }
    return result

def num_of_stocks(user_id, stock, amount):
    # stock_quote = get_quote(user_id, stock)
    # num_stocks = amount/stock_quote
    # return num_stocks
    return amount/5
    