from pymongo import MongoClient, ReturnDocument


MONGOURL = 'mongodb+srv://sigilai:DkN6M9PkBbvz8143@cluster0.g2zyv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
client = MongoClient(MONGOURL)
collection = client.stocktradingapp
# db = client.admin
# status = db.command("serverStatus")
# print(status)

db = client.admin
print(db)