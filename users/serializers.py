from rest_framework import serializers
from handsons.models import Handson
from handsons.serializers import UserSerializer

class HandsonListSerializer(serializers.ModelSerializer):
    owner = UserSerializer()

    class Meta:
        model = Handson
        fields = ('id', 'owner', 'title', 'headline', 'detail', 'require', 'document_url',
                  'meeting_url', 'movie_url', 'start_at', 'end_at', 'is_public', 'status')
        extra_kwargs = {
            'headline': {
                'write_only': True,
                'allow_blank': True,
            },
            'detail': {
                'write_only': True,
                'allow_blank': True,
            },
            'require': {
                'write_only': True,
                'allow_blank': True,
            },
            'document_url': {
                'write_only': True,
                'allow_blank': True,
            },
            'meeting_url': {
                'write_only': True,
                'allow_blank': True,
            },
            'movie_url': {
                'write_only': True,
                'allow_blank': True,
            },
        }