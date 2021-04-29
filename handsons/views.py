from django.shortcuts import render
from rest_framework import generics, permissions

from users.models import CustomUser
from .models import Handson, HandsonMember
from .serializers import HandsonListCreateSerializer, HandsonRetrieveUpdateDestroySerializer, HandsonMemberSerializer
from .permissions import IsAuthorOrReadOnly
import django_filters.rest_framework as filters
from rest_framework import exceptions

# Create your views here.

# Handson list & create

class HandsonListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = HandsonListCreateSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned handsons to a given user,
        by filtering against a `owner` query parameter in the URL.
        """
        queryset = Handson.objects.all()
        owner_name = self.request.query_params.get('owner')
        if owner_name is not None:
            if owner_name == 'me':
                current_user = self.request.user
                queryset = queryset.filter(owner=current_user) 
            else:
                try:
                    owner_name = CustomUser.objects.get(username=owner_name)
                    queryset = queryset.filter(owner=owner_name)
                except: 
                    raise exceptions.ParseError('Invalid Request')
        return queryset

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
