from random import randrange
from flask import Flask
from flask import request, jsonify
import random


app = Flask(__name__)

@app.route('/')
def quote():


    symbol = request.args.get("symbol")

    symbol.upper()


    # gives a value based on symbol first letter being in a range
    if ord(symbol[0]) in range(ord('A'), ord('E')):
        result = round(random.uniform(100, 115), 2)

    elif ord(symbol[0]) in range(ord('E'), ord('H')):
        result = round(random.uniform(1000, 1200), 2)

    elif ord(symbol[0]) in range(ord('H'), ord('L')):
        result = round(random.uniform(4, 6), 2)

    elif ord(symbol[0]) in range(ord('L'), ord('Q')):
        result = round(random.uniform(0.1, 2), 2)
        
    elif ord(symbol[0]) in range(ord('Q'), ord('Z')):
        result = round(random.uniform(40, 45), 2)

    res = {"price" : result}

    print("Sent the following quote --->", res)
    return jsonify(res)



app.run(host="0.0.0.0", port=7000)