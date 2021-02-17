from rest_framework import serializers
from .models import Handson, CustomUser

# User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')

# Handson list
class HandsonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Handson
        fields = ('id', 'owner', 'title', 'start_at', 'is_public', 'status')

# Handson detail
class HandsonDetailSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    class Meta:
        model = Handson
        fields = ('id', 'owner', 'title', 'headline', 'detail', 'require', 'document_url', 'meeting_url', 'movie_url', 'start_at', 'is_public', 'status')
