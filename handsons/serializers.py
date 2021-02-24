from rest_framework import serializers
from .models import Handson, CustomUser

# User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')

# Handson list & create
class HandsonListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Handson
        fields = ('id', 'owner', 'title', 'headline', 'detail', 'require', 'document_url', 'meeting_url', 'movie_url', 'start_at', 'end_at', 'is_public', 'status')
        extra_kwargs = {
            'headline' : {
                'write_only' : True,
                'allow_blank' : True,
            },
            'detail' : {
                'write_only' : True,
                'allow_blank' : True,
            },
            'require' : {
                'write_only' : True,
                'allow_blank' : True,
            },
            'document_url' : {
                'write_only' : True,
                'allow_blank' : True,
            },
            'meeting_url' : {
                'write_only' : True,
                'allow_blank' : True,
            },
            'movie_url' : {
                'write_only' : True,
                'allow_blank' : True,
            },
            'end_at' : {
                'write_only' : True,
            },
        }

# Handson detail
class HandsonDetailSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    class Meta:
        model = Handson
        fields = ('id', 'owner', 'title', 'headline', 'detail', 'require', 'document_url', 'meeting_url', 'movie_url', 'start_at', 'is_public', 'status')
