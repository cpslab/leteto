from rest_framework import serializers
from .models import Handson

# mserializer
class HandsonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Handson
        fields = ('id', 'owner', 'title', 'headline', 'detail', 'require', 'document_url', 'meeting_url', 'movie_url', 'start_at', 'end_at', 'created_at', 'updated_at', 'is_public', 'status')