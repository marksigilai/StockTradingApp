from pymongo import MongoClient

MONGOURL = 'mongodb+srv://<username>:<password>@cluster0.g2zyv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
client = MongoClient(MONGOURL)