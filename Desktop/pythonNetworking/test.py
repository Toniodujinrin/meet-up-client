from scapy.all import *

destination_ip_address = "10.0.0.1"
broadcast_mac_address = "ff:ff:ff:ff:ff:ff"
responses, unanswered = srp(
    Ether(dst=broadcast_mac_address)/ARP(pdst=destination_ip_address), retry=3, timeout=3)

for request, response in responses:
    print(f"ARP request: {request}")
    print(f"ARP response: {response}")
