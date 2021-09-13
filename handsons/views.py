from django.shortcuts import render
from rest_framework import generics, permissions

from users.models import CustomUser
from .models import Handson, HandsonMember
from .serializers import HandsonListCreateSerializer, HandsonRetrieveUpdateDestroySerializer, HandsonMemberSerializer
from .permissions import IsAuthorOrReadOnly
import django_filters.rest_framework as filters
from rest_framework import exceptions
from rest_framework.response import Response
from django.utils import timezone
from django.utils.timezone import localtime

# Create your views here.

# Handson list & create

class HandsonListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = HandsonListCreateSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned handsons to a given user,
        by filtering against a `owner` query parameter in the URL.
        """
        queryset = Handson.objects.order_by('-start_at')
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

        """
        Optionally restricts the returned handsons to a given datetime,
        by filtering against a `status` query parameter in the URL.
        """
        status = self.request.query_params.get('status')
        now = localtime(timezone.now())
        if status is not None:
            if status == 'future':
                queryset = queryset.filter(start_at__gt=now) 
            elif status == 'past':
                queryset = queryset.filter(end_at__lt=now)
            elif status == 'open':
                queryset = queryset.filter(start_at__lte=now, end_at__gte=now)
            else:
                raise exceptions.ParseError('Invalid Request')

        """
        Optionally restricts the returned handsons to a given joined handson by any user,
        by filtering against a `join` query parameter in the URL.
        """
        join_user_id = self.request.query_params.get('join')
        if join_user_id is not None:
            join_user = None
            if join_user_id == 'me':
                join_user = self.request.user
            else:
                try:
                    join_user = CustomUser.objects.get(id=join_user_id)
                except:
                    # CustomUser matching query does not exist
                    raise exceptions.ParseError('Invalid Request')
                    
            join_handson_member = HandsonMember.objects.filter(user=join_user).values()
            join_handsons = [handson_member['handson_id'] for handson_member in list(join_handson_member)]
            queryset = queryset.filter(id__in=join_handsons)

        return queryset

class HandsonRetrieveUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Handson.objects.all()
    serializer_class = HandsonRetrieveUpdateDestroySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


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