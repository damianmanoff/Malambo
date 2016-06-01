from django.shortcuts import render

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from navori.models import Navori
import json, ast

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

@csrf_exempt
def login(request):
	"""
	List all code snippets, or create a new snippet.
	"""
	if request.method == 'GET':
		print("-----------------------request")
		print(request)
		return JSONResponse("")

	elif request.method == 'POST':
		data = JSONParser().parse(request)
		result = navori.login(data["userName"], data["password"])
		print(result)
		return JSONResponse(result, status=200)
	
	elif request.method == 'OPTIONS':
		return JSONResponse("")
