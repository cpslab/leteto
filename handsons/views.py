from django.shortcuts import render
from rest_framework import generics

from .models import Handson
from .serializers import HandsonListSerializer, HandsonDetailSerializer

# Create your views here.

# Handson list
class HandsonList(generics.ListAPIView):
    queryset = Handson.objects.all()
    serializer_class = HandsonListSerializer

# Handson detail
class HandsonDetail(generics.RetrieveAPIView):
    queryset = Handson.objects.all()
    serializer_class = HandsonDetailSerializer
    lookup_field = 'id'