from django.shortcuts import render
from rest_framework import generics, permissions

from users.models import CustomUser
from .models import Handson, HandsonMember
from .serializers import HandsonListCreateSerializer, HandsonRetrieveUpdateDestroySerializer, HandsonMemberSerializer
from .permissions import IsAuthorOrReadOnly
import django_filters.rest_framework as filters
from rest_framework import exceptions
from rest_framework.response import Response

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
        owner_id = self.request.query_params.get('owner')
        if owner_id is not None:
            if owner_id == 'me':
                current_user = self.request.user
                queryset = queryset.filter(owner=current_user) 
            else:
                try:
                    CustomUser.objects.get(id=owner_id)
                    queryset = queryset.filter(owner=owner_id)
                except: 
                    # CustomUser matching query does not exist
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


class NestedHandsonMember(generics.ListAPIView):
    queryset = HandsonMember.objects.all()
    serializer_class = HandsonMemberSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = HandsonMember.objects.filter(handson=self.kwargs.get('pk'))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)