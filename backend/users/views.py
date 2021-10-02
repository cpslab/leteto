from django.shortcuts import render
from rest_framework import generics, permissions

from handsons.models import Handson, CustomUser
from .serializers import HandsonListSerializer
from rest_framework import exceptions

# Create your views here.

class HandsonListAPIView(generics.ListAPIView):
    serializer_class = HandsonListSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned handsons to a given user,
        by filtering against a `user_id` in the URL.
        """
        user_id = self.kwargs['user_id']
        try:
            CustomUser.objects.get(id=user_id)
        except:
            # CustomUser matching query does not exist
            raise exceptions.ParseError('Invalid Request')   
        return Handson.objects.filter(owner=user_id)