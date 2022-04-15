import network
import config

import xml_builder


def user_dumplog(user_id, outputfile):
  result = config.collection.logs.find(
        {'id': user_id}
  )
  xml_result = xml_builder.convert(result)
  f = open(outputfile, "w")
  f.write(xml_result)
  return {'status':'passed'}

def dumplog(outputfile):
  result = config.collection.logs.find()
  xml_result = xml_builder.convert(result)
  f = open(outputfile, "w")
  f.write(xml_result)
  return {'status':'passed'}

def display_summary(user_id):
  accounts_result = config.collection.accounts.find(
    {'id': user_id}
  )
  triggers_result = config.collection.triggers.find(
    {'id': {'$regex': user_id}}
  )
  logs_result = config.collection.logs.find(
    {'id': user_id}
  )
  xml_a = xml_builder.convert(accounts_result)
  xml_t = xml_builder.convert(triggers_result)
  xml_l = xml_builder.convert(logs_result)




  xml_result = xml_a + '\n' + xml_t + '\n' + xml_l

  return xml_l

# user_dumplog('xyz', 'testlog.json')

# f = open('testdisplaysum.json', "w")
# f.write(display_summary('xyz'))