from pymongo import MongoClient

# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient('')#(<<MONGODB URL>>)
db=client.admin
serverStatusResult=db.command("serverStatus")
#print(serverStatusResult)

def query_data(db, querystr):
  # given a querystr, query the database
  pass

def write_data(db, datadict):
  # from a dictionary of values, write a new data element
  pass

def update_data(db, keydict, datadict):
  # from a dictionary of values, update an existing data element that matches the keydict (key: match_value)
  pass

def remove_data(db, keydict):
  # from a keydict (key: match_value), remove a data element
  pass