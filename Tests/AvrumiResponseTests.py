import requests
import os

AVRUMI_ROOT_URL = 'http://avrumi.co.il'
GET_PAGES_URL = 'GetAllProducts'


def test_sanity():
    r = requests.get("http://avrumi.co.il/GetAllProducts")
    print 1
