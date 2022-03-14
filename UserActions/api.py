
import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True


#Database queries
@app.route('/useraccount', methods=['GET'])
def get_user():
    query_params = request.args
    user_id = query_params.get("id")

    #make db query using user_id to get all user info

    return "TODO: user account info"

@app.route('/userstocks', methods=['GET'])
def get_user_stocks():
    query_params = request.args
    user_id = query_params.get("id")
    try:
        stock_name = query_params.get("stock")
    except:
        stock_name = None

    #make db query for all user stocks
    return "TODO: stock info for user (optional param: stock name)"

#Buy
@app.route('/buy', methods=['POST'])
def buy_stock():
    query_params = request.args
    user_id = query_params.get("id")
    stock_name = query_params.get("stock")
    amount = query_params.get("amount")

    #query accounts db for amount of money
    #if sufficient, place buy in trans history to wait for commit buy

    #make db insertion for buy amount
    return "TODO: insert buy in db"

@app.route('/commitbuy', methods=['POST'])
def commit_buy_stock():
    query_params = request.args
    user_id = query_params.get("id")
    
    #commit buy if a buy within the last 60 seconds
    #query for user id buy within 60 seconds (use timestamp difference)
    #if not exists, don't do anything
    #else, update db with updated stock amount (need to check if user already has the stock)
    #       and record event

    return "TODO: commit buy if recent buy exists"

@app.route('/cancelbuy', methods=['POST'])
def cancel_buy_stock():
    query_params = request.args
    user_id = query_params.get("id")
    
    #cancel buy if a buy within the last 60 seconds
    #query for user id buy within 60 seconds (use timestamp difference)
    #if not exists, don't do anything
    #else, record cancel event

    return "TODO: cancel buy if recent buy exists"

#Sell
@app.route('/sell', methods=['POST'])
def sell_stock():
    query_params = request.args
    user_id = query_params.get("id")
    stock_name = query_params.get("stock")
    amount = query_params.get("amount")

    #query accounts db for amount of stock
    #if sufficient, place sell in trans history to wait for commit sell

    #make db insertion for sell amount
    return "TODO: insert sell in db"

@app.route('/commitsell', methods=['POST'])
def commit_sell_stock():
    query_params = request.args
    user_id = query_params.get("id")
    
    #commit buy if a sell within the last 60 seconds
    #query for user id sell within 60 seconds (use timestamp difference)
    #if not exists, don't do anything
    #else, update db with updated stock amount
    #       and record event

    return "TODO: commit sell if recent sell exists"

@app.route('/cancelsell', methods=['POST'])
def cancel_sell_stock():
    query_params = request.args
    user_id = query_params.get("id")
    
    #cancel sell if a sell within the last 60 seconds
    #query for user id sell within 60 seconds (use timestamp difference)
    #if not exists, don't do anything
    #else, record cancel event

    return "TODO: cancel sell if recent sell exists"

#Set Buy
@app.route('/setbuy', methods=['POST'])
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

@app.route('/setbuytrigger', methods=['POST'])
def set_buy_stock_trigger():
    query_params = request.args
    user_id = query_params.get("id")
    stock_name = query_params.get("stock")
    amount = query_params.get("amount")

    #query for quoteserver stock price
    #create and commit a buy action if the stock price <= trigger amount

    return "TODO: set buy trigger"

@app.route('/cancelsetbuy', methods=['POST'])
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
@app.route('/setsell', methods=['POST'])
def sell_stock():
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

@app.route('/setselltrigger', methods=['POST'])
def set_sell_stock_trigger():
    query_params = request.args
    user_id = query_params.get("id")
    stock_name = query_params.get("stock")
    amount = query_params.get("amount")

    #query for quoteserver stock price
    #create and commit a sell action if the stock price >= trigger amount

    return "TODO: set sell trigger"

@app.route('/cancelsetsell', methods=['POST'])
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
@app.route('/userdumplog', methods=['GET'])
def user_dumplog_endpoint():
    query_params = request.args
    user_id = query_params.get('id')
    output_file = query_params.get('filename')

    #query transaction db for all transactions for this user

    return "TODO: user dumplogs"

@app.route('/dumplog', methods=['GET'])
def dumplog_endpoint():
    query_params = request.args
    output_file = query_params.get('filename')

    #query transaction db for all transactions for all users

    return "TODO: all dumplogs"

@app.route('/summary', methods=['GET'])
def display_summary_endpoint():
    query_params = request.args
    user_id = query_params.get("id")

    #query transaction db for all transactions for this user
    #query users for user account info (account, amount, triggers, etc.)

    return "TODO: summary"

app.run()