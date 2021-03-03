from django.shortcuts import render
from rest_framework import generics

from .models import Handson
from .serializers import HandsonListCreateSerializer, HandsonRetrieveUpdateDestroySerializer

# Create your views here.

# Handson list & create
class HandsonListCreateAPIView(generics.ListCreateAPIView):
    queryset = Handson.objects.all()
    serializer_class = HandsonListCreateSerializer

# Handson detail & update & delete
class HandsonRetrieveUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Handson.objects.all()
    serializer_class = HandsonRetrieveUpdateDestroySerializer
    lookup_field = 'id'