#!/usr/bin/env python

from suds.client import Client

class Navori:

    def __init__(self):
        self.url = 'http://200.42.138.40/NavoriService/NavoriService.svc?wsdl'
        self.service = Client(self.url)


    def action(self, action, parameters):
    	return getattr(self.service.service, action)(*parameters)



# parameters = ["damian.manoff","damian.manoff"]
# action = "CheckLoginSDK"
# login = Navori().action(action, parameters)
# print login