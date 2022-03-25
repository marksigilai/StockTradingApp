import network
import config
from pymongo import ReturnDocument
import xml_builder

import sys

def user_dumplog(user_id, outputfile):
  result = config.collection.logs.find(
        {'id': user_id}
  )
  xml_result = xml_builder.convert(result)
  f = open(outputfile, "w")
  f.write(xml_result)
  return result

def dumplog(outputfile):
  result = config.collection.logs.find()
  xml_result = xml_builder.convert(result)
  f = open(outputfile, "w")
  f.write(xml_result)
  return result

def display_summary(user_id):
  accounts_result = config.collection.accounts.find_one(
    {'id': user_id}
  )
  logs_result = config.collection.logs.find(
    {'id': user_id}
  )

  result = accounts_result + '\n' + logs_result
  xml_result = xml_builder.convert(result)

  return xml_result