import socket
import threading

import subprocess
from netaddr import *
from scapy.all import *

interface = "eth0"


conf.verb = 0
na = IPNetwork("10.0.0.84/24")
print(na.broadcast)


def getIpAddress():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sc:
        try:

            sc.connect(("8.8.8.8", 80))
            ip = sc.getsockname()

            return ip[0]

        except Exception as err:

            print(err)
            print("could not get ip address")
            sys.exit()


def send_arp(ip_address):
    responses, unanswered = srp(
        Ether(dst="ff:ff:ff:ff:ff:ff")/ARP(pdst=ip_address), retry=20, timeout=3)
    hostname = "unknown"
    mac = "unknown"
    try:
        _hostname = socket.gethostbyaddr(ip_address)
        if (_hostname):
            hostname = _hostname[0]
    except Exception:
        print("")
    for s, r in responses:
        if (r[Ether].src):
            mac = r[Ether].src
    if (not (mac == "unknown" and hostname == "unknown")):
        print(hostname, mac, ip_address)


def send_arps():
    if isinstance(getIpAddress(), str):
        for i in range(0, 255):
            network_address = getIpAddress().split(".")
            network_address.pop()
            network_address.append(str(i))
            ip = ".".join(network_address)
            th = threading.Thread(target=send_arp, args=(ip,))
            th.start()


send_arps()
