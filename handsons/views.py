from django.shortcuts import render
from rest_framework import generics

from .models import *
from .serializers import HandsonSerializer

# Create your views here.



# Create your views here.
class HandsonList(generics.ListCreateAPIView):
    queryset = Handson.objects.all()
    serializer_class = HandsonSerializer
