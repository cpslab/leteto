from django.shortcuts import render
from rest_framework import generics, permissions


from .models import Handson, HandsonMember
from .serializers import HandsonListCreateSerializer, HandsonRetrieveUpdateDestroySerializer, HandsonMemberSerializer
from .permissions import IsAuthorOrReadOnly

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


class HandsonMemberList(generics.ListCreateAPIView):
    queryset = HandsonMember.objects.all()
    serializer_class = HandsonMemberSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class HandsonMemberRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = HandsonMember.objects.all()
    serializer_class = HandsonMemberSerializer
    permission_classes = [IsAuthorOrReadOnly]
