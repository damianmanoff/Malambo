from django.shortcuts import render

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from navori.models import Navori
from rest_framework.decorators import detail_route
import json, ast
from django.views.decorators.csrf import ensure_csrf_cookie

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

navori = Navori()

@csrf_exempt
class NavoriService():

    # @detail_route(methods=['post'], url_path='login')

    def response(self, result, vartoCheck = None):
        status = 200
        if (vartoCheck != None):
            status = (status , 400) [result[vartoCheck] == "DISCONNECTED"]
        return JSONResponse(result, status=status)

    @csrf_exempt
    def login(self, request):
        data = JSONParser().parse(request)
        print(data)
        result = navori.login(data["userName"], data["password"])
        print(result)
        return self.response(result)

    @csrf_exempt
    def getPlayers(self, request):
        data = JSONParser().parse(request)
        print(data)
        result = navori.getPlayers(data["boxId"], data["managerId"], data["sessionId"])
        print(result)
        return self.response(result, "GetPlayerResult")

    @csrf_exempt
    def getGroup(self, request):
        data = JSONParser().parse(request)
        print(data)
        result = navori.getGroup(data["boxId"], data["managerId"], data["sessionId"])
        print(result)
        return self.response(result)
    @csrf_exempt
    def getMedia(self, request):
        data = JSONParser().parse(request)
        print(data)
        result = navori.getMedia(data["groupId"], data["managerId"], data["sessionId"])
        print(result)
        return self.response(result)
    @csrf_exempt
    def getTemplate(self, request):
        data = JSONParser().parse(request)
        print(data)
        result = navori.getTemplate(data["groupId"], data["managerId"], data["sessionId"])
        print(result)
        return self.response(result)

@csrf_exempt
def checkNavori(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        print("-----------------------request")
        print(request)
        return JSONResponse("")

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        action = data["action"]
        parameters = data["parameters"]
        result = navori.action(action, parameters)
        print(result)
        return JSONResponse(result, status=200)
    
    elif request.method == 'OPTIONS':
        return JSONResponse("")

# @csrf_exempt
# def login(request):
#   """
#   List all code snippets, or create a new snippet.
#   """
#   if request.method == 'GET':
#       print("-----------------------request")
#       print(request)
#       return JSONResponse("")

#   elif request.method == 'POST':
        
    
#   elif request.method == 'OPTIONS':
#       return JSONResponse("")
