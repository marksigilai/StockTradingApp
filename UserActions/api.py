
import flask
from flask import request, jsonify

import accounts
import quotes
import buy
import sell
import setbuy
import setsell

app = flask.Flask(__name__)
app.config["DEBUG"] = True


#Database queries
@app.route('/useraccount', methods=['POST'])
def get_user():
    query_params = request.args
    user_id = query_params.get("id")

    result = accounts.find_user_account(user_id)
    return result

@app.route('/userstocks', methods=['POST'])
def get_user_stocks():
    query_params = request.args
    user_id = query_params.get("id")
    try:
        stock_name = query_params.get("stock")
    except:
        stock_name = ''
    
    result = accounts.get_user_stocks(user_id, stock_name)
    return result

#Generic functions
@app.route('/ADD', methods=['POST'])
def add_funds_to_account():
    query_params = request.args
    user_id = query_params.get("id")
    amount = query_params.get("amount")

    #update user account with added money
    result = accounts.add_funds(user_id, amount)
    return result

@app.route('/QUOTE', methods=["POST"])
def quote_stock():
    query_params = request.args
    user_id = query_params.get("id")
    stock_name = query_params.get("stock")
    
    result = quotes.get_quote(user_id, stock_name)
    return result

#Buy
@app.route('/BUY', methods=['POST'])
def buy_stock():
    query_params = request.args
    user_id = query_params.get("id")
    stock_name = query_params.get("stock")
    amount = query_params.get("amount")

    result = buy.start_buy(user_id, stock_name, amount)
    return result

@app.route('/COMMIT_BUY', methods=['POST'])
def commit_buy_stock():
    query_params = request.args
    user_id = query_params.get("id")
    
    result = buy.commit_buy(user_id)
    return result

@app.route('/CANCEL_BUY', methods=['POST'])
def cancel_buy_stock():
    query_params = request.args
    user_id = query_params.get("id")
    
    result = buy.cancel_buy(user_id)
    return result

#Sell
@app.route('/SELL', methods=['POST'])
def sell_stock():
    query_params = request.args
    user_id = query_params.get("id")
    stock_name = query_params.get("stock")
    amount = query_params.get("amount")

    result = sell.start_sell(user_id, stock_name, amount)
    return result

@app.route('/COMMIT_SELL', methods=['POST'])
def commit_sell_stock():
    query_params = request.args
    user_id = query_params.get("id")
    
    result = sell.commit_sell(user_id)
    return result

@app.route('/CANCEL_SELL', methods=['POST'])
def cancel_sell_stock():
    query_params = request.args
    user_id = query_params.get("id")

    result = sell.cancel_sell(user_id)
    return result

#Set Buy
@app.route('/SET_BUY_AMOUNT', methods=['POST'])
def set_buy_stock():
    query_params = request.args
    user_id = query_params.get("id")
    stock_name = query_params.get("stock")
    amount = query_params.get("amount")

    #query for user cash amount
    #if sufficient:
    #   create a log of trans
    #   create reserve account holding allocated funds?
    #   update db with decreased cash amount, trigger amount

    return "TODO: create buy amount"

@app.route('/SET_BUY_TRIGGER', methods=['POST'])
def set_buy_stock_trigger():
    query_params = request.args
    user_id = query_params.get("id")
    stock_name = query_params.get("stock")
    amount = query_params.get("amount")

    #query for quoteserver stock price
    #create and commit a buy action if the stock price <= trigger amount

    return "TODO: set buy trigger"

@app.route('/CANCEL_SET_BUY', methods=['POST'])
def cancel_set_buy_stock():
    query_params = request.args
    user_id = query_params.get("id")

    #query transactions (or user account?) for a set buy amount
    #if exists,
    #   account is reset to the value before the set buy
    #   remove the buy trigger
    #   create a transaction log

    return "TODO: cancel set buy"

#Set Sell
@app.route('/SET_SELL_AMOUNT', methods=['POST'])
def set_sell_stock_amount():
    query_params = request.args
    user_id = query_params.get("id")
    stock_name = query_params.get("stock")
    amount = query_params.get("amount")

    #query for user stock amount
    #if sufficient:
    #   create a log of trans
    #   create reserve account holding allocated stocks?
    #   update db with decreased stock amount, trigger amount

    return "TODO: create sell amount"

@app.route('/SET_SELL_TRIGGER', methods=['POST'])
def set_sell_stock_trigger():
    query_params = request.args
    user_id = query_params.get("id")
    stock_name = query_params.get("stock")
    amount = query_params.get("amount")

    #query for quoteserver stock price
    #create and commit a sell action if the stock price >= trigger amount

    return "TODO: set sell trigger"

@app.route('/CANCEL_SET_SELL', methods=['POST'])
def cancel_set_sell_stock():
    query_params = request.args
    user_id = query_params.get("id")

    #query transactions (or user account?) for a set sell amount
    #if exists,
    #   account is reset to the value before the set sell
    #   remove the sell trigger
    #   create a transaction log

    return "TODO: cancel set sell"

#Logs
@app.route('/USER_DUMPLOG', methods=['POST'])
def user_dumplog_endpoint():
    query_params = request.args
    user_id = query_params.get('id')
    output_file = query_params.get('filename')

    #query transaction db for all transactions for this user

    return "TODO: user dumplogs"

@app.route('/DUMPLOG', methods=['POST'])
def dumplog_endpoint():
    query_params = request.args
    output_file = query_params.get('filename')

    #query transaction db for all transactions for all users

    return "TODO: all dumplogs"

@app.route('/DISPLAY_SUMMARY', methods=['POST'])
def display_summary_endpoint():
    query_params = request.args
    user_id = query_params.get("id")

    #query transaction db for all transactions for this user
    #query users for user account info (account, amount, triggers, etc.)

    return "TODO: summary"

app.run()