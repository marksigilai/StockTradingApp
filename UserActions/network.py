#!/usr/bin/env python3
import socket

class QuoteServer:

  HOST = '192.168.4.2'  # The server's hostname or IP address
  PORT = 4444       # The port used by the server

  def send_request(req_str):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.sendall(req_str.encode('utf-8'))
        data = s.recv(1024)
    print('Received', repr(data))
    return data
