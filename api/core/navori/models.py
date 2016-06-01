from __future__ import unicode_literals

from django.db import models
from suds.client import Client

class Navori:

    def __init__(self):
        self.url = 'http://200.42.138.40/NavoriService/NavoriService.svc?wsdl'
        self.service = Client(self.url)


    def action(self, action, parameters):
    	return getattr(self.service.service, action)(*parameters)

    def login(self, userName, password):
    	return self.action("CheckLoginSDK", [userName, password])


# Create your models here.
