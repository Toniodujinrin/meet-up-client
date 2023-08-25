from scapy.all import *
import socket 
ip_address = '10.0.0.184'
name = socket.gethostbyaddr(ip_address)
print(name)