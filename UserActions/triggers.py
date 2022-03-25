import config
import network
import quotes
import json
import time

#Thread to watch stock quotes for triggers

def get_all_triggers():
    triggers = config.collection.triggers.find()
    triggers_j = json.loads(triggers)
    return triggers_j

def quote_stock(user_id, stock):
    result = quotes.get_quote(user_id, stock)
    stock_price = float(result[0])

    return stock_price



#Delayed infinite loop to periodically check triggers and quote triggered stocks
while(1):

    time.sleep(60)
    break