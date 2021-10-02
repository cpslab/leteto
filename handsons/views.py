from rest_framework import generics, permissions, exceptions
from users.models import CustomUser
from .models import ContentPassMember, Handson, HandsonContent, HandsonMember
from .serializers import HandsonContentPassMemberReadSerializer, HandsonContentPassMemberWriteSerializer, HandsonContentReadSerializer, HandsonContentWriteSerializer, HandsonMemberReadSerializer, HandsonMemberWriteSerializer, HandsonReadListSerializer, HandsonReadSerializer, HandsonWriteSerializer
from .permissions import IsContentOwnerOrReadOnly, IsHandsonMemberOrReadOnly, IsMemberOrReadOnly, IsOwnerOrReadOnly
from rest_framework.response import Response
from django.utils import timezone
from django.utils.timezone import localtime
from .common_views import BaseRetrieveDestroyAPIView, BaseRetrieveUpdateDestroyAPIView

# Create your views here.


# Handson API
class HandsonListCreateAPIView(generics.ListCreateAPIView):

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return HandsonReadListSerializer
        else:
            return HandsonWriteSerializer
    
    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Handson.objects.order_by('-start_at')

        """
        Optionally restricts the returned handsons to a given user,
        by filtering against a `owner` query parameter in the URL.
        """
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

class HandsonRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return HandsonReadSerializer
        else:
            return HandsonWriteSerializer

    def get_permissions(self):
        permission_classes = [IsOwnerOrReadOnly]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return Handson.objects.all()


# Handson Member API
class NestedHandsonMemberListCreateView(generics.ListCreateAPIView):

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return HandsonMemberReadSerializer
        else:
            return HandsonMemberWriteSerializer

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return HandsonMember.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = HandsonMember.objects.filter(handson=self.kwargs.get('pk'))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class NestedHandsonMemberRetrieveDestroyView(BaseRetrieveDestroyAPIView):

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return HandsonMemberReadSerializer
        else:
            return HandsonMemberWriteSerializer

    def get_permissions(self):
        permission_classes = [IsMemberOrReadOnly]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return HandsonMember.objects.all()

    lookup_fields = ('handson', 'pk')


# Handson Content API
class NestedHandsonContentListCreateView(generics.ListCreateAPIView):

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return HandsonContentReadSerializer
        else:
            return HandsonContentWriteSerializer

    def get_permissions(self):
        permission_classes = [IsContentOwnerOrReadOnly]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return HandsonContent.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = HandsonContent.objects.filter(handson=self.kwargs.get('pk'))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class NestedHandsonContentRetrieveUpdateDestroyView(BaseRetrieveUpdateDestroyAPIView):

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return HandsonContentReadSerializer
        else:
            return HandsonContentWriteSerializer

    def get_permissions(self):
        permission_classes = [IsContentOwnerOrReadOnly]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return HandsonContent.objects.all()
    
    lookup_fields = ('handson', 'pk')


# Content Pass Member API
class NestedHandsonContentPassMemberListCreateView(generics.ListCreateAPIView):

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return HandsonContentPassMemberReadSerializer
        else:
            return HandsonContentPassMemberWriteSerializer

    def get_permissions(self):
        permission_classes = [IsHandsonMemberOrReadOnly]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return ContentPassMember.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = ContentPassMember.objects.filter(content=self.kwargs.get('pk'))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class NestedHandsonContentPassMemberRetrieveDestroyView(BaseRetrieveDestroyAPIView):

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return HandsonContentPassMemberReadSerializer
        else:
            return HandsonContentPassMemberWriteSerializer

    def get_permissions(self):
        permission_classes = [IsHandsonMemberOrReadOnly]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return ContentPassMember.objects.all()
    
    lookup_fields = ('content', 'pk')