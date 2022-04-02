from xml.dom import minidom
from pymongo import MongoClient
import os
from bson.json_util import dumps

def convert(cursor):
    output = dumps(list(cursor))
    return output