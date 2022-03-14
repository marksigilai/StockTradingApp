import sys

"""
Use: single parameter must be the filename to parse
"""

commands = ["ADD", "QUOTE", "BUY", "COMMIT_BUY", "CANCEL_BUY", "SELL", "COMMIT_SELL", "CANCEL_SELL", "SET_BUY_AMOUNT", "CANCEL_SET_BUY", "SET_BUY_TRIGGER", "SET_SELL_AMOUNT", "SET_SELL_TRIGGER", "CANCEL_SET_SELL", "DUMPLOG", "DISPLAY_SUMMARY"]

input_file = sys.argv[0]
f = open(input_file, "r")

lines = f.read()

for line in lines:
    command = line.split(' ')[1]
    tokens = command.split(',')
    action = tokens[0]
    args = tokens[1:]

    if action not in commands:
        print("Error, unrecognized command")
        continue

    