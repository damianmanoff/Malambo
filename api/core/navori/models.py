from __future__ import unicode_literals

from django.db import models
from suds.client import Client
from suds.xsd.doctor import Import, ImportDoctor

class Navori:

    def __init__(self):
        self.url = 'http://200.42.138.40/NavoriService/NavoriService.svc?wsdl'
        schema_url = 'http://schemas.microsoft.com/2003/10/Serialization/Arrays'
        schema_import = Import(schema_url)
        schema_doctor = ImportDoctor(schema_import)

        imp = Import('http://schemas.xmlsoap.org/soap/encoding/')
        # Below is your targetNamespace presented in WSDL. Remember
        # that you can add more namespaces by appending more imp.filter.add
        
        doctor = ImportDoctor(imp) 
        self.service = Client(url=self.url, doctor=doctor)
        #print(self.service)
        #print(self.getPlaylist([1], 1, "9EEFD627 - 034949D0 - B6DC5016 - 2F5A6F81"))
        # temp = str(self.service);
        # myFile = open('today','w')
        # myFile.write(temp)
        # myFile.close()
        # for method in self.service.wsdl.services[0].ports[0].methods.values():
        #     # print (method)
        #     print ('%s(%s)' % (method.name, ', '.join('%s: %s' % (part.type, part.name) for part in method.soap.input.body.parts)))


    def action(self, action, parameters):
    	return getattr(self.service.service, action)(*parameters)

    def login(self, userName, password):

    	return self.action("CheckLoginSDK", [userName, password])

    def getPlayers(self, boxId, managerId, sessionId):
    	return self.action("GetPlayer", [boxId, managerId, sessionId])

    def getGroup(self, boxId, managerId, sessionId):
    	return self.action("GetGroup", [boxId, managerId, sessionId])

    def getMedia(self, groupId, managerId, sessionId):
    	return self.action("GetMedia", [groupId, managerId, sessionId])

    def getTemplate(self, groupId, managerId, sessionId):
        return self.action("GetTemplate", [groupId, managerId, sessionId])
    
    def getFolder(self, groupId, managerId, sessionId):
        return self.action("GetFolder", [groupId, managerId, sessionId])

    def getPlaylistComponent(self, playlistId, groupId, managerId, sessionId):
        return self.action("GetPlaylistComponent", [playlistId, groupId, managerId, sessionId])

    def getPlaylist(self, groupId, managerId, sessionId):
        array = self.service.factory.create('ns4:ArrayOflong')
        array.long = groupId
        return self.action("GetPlaylist", [array, managerId, sessionId])

# Create your models here.
