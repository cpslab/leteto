from django.shortcuts import render
from rest_framework import generics

from .models import Handson
from .serializers import HandsonListSerializer

# Create your views here.
class HandsonList(generics.ListAPIView):
    queryset = Handson.objects.all()
    serializer_class = HandsonListSerializer
