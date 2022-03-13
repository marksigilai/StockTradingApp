from xml.dom import minidom
from pymongo import MongoClient
import os

class XmlBuilder:
  #Class to build xml objects and write to the logfile

  logfile = os.getEnv('logfilepath') #get path of logfile that was created on app startup

  