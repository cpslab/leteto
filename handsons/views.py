from django.shortcuts import render
from rest_framework import generics, permissions


from .models import Handson, HandsonMember
from .serializers import HandsonListSerializer, HandsonMemberSerializer

# Create your views here.
class HandsonList(generics.ListAPIView):
    queryset = Handson.objects.all()
    serializer_class = HandsonListSerializer

class HandsonMemberList(generics.ListCreateAPIView):
    queryset = HandsonMember.objects.all()
    serializer_class = HandsonMemberSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

