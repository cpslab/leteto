from django.shortcuts import render
from rest_framework import generics

from .models import Handson
from .serializers import HandsonListCreateSerializer, HandsonDetailSerializer

# Create your views here.

# Handson list & create
class HandsonListCreateAPIView(generics.ListCreateAPIView):
    queryset = Handson.objects.all()
    serializer_class = HandsonListCreateSerializer

# Handson detail
class HandsonDetail(generics.RetrieveAPIView):
    queryset = Handson.objects.all()
    serializer_class = HandsonDetailSerializer
    lookup_field = 'id'