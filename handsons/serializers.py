from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Handson, CustomUser, HandsonMember
from django.contrib.auth.validators import UnicodeUsernameValidator

# User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')
        extra_kwargs = {
            'username': {
                'validators': [UnicodeUsernameValidator()],
            }
        }

# Handson list & create


class HandsonListCreateSerializer(serializers.ModelSerializer):
    owner = UserSerializer()

    class Meta:
        model = Handson
        fields = ('id', 'owner', 'title', 'headline', 'detail', 'require', 'document_url',
                  'meeting_url', 'movie_url', 'start_at', 'end_at', 'is_public')
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

    def create(self, validated_data):
        owner_data = validated_data.pop('owner')
        username = owner_data.pop('username')
        owner = CustomUser.objects.get_or_create(username=username)[0]
        handson = Handson.objects.create(owner=owner, **validated_data)
        return handson
    
    def validate(self, data):
        """
        Check that start_at is before end_at.
        """
        if data['start_at'] >= data['end_at']:
            raise serializers.ValidationError("end_at must occur after start_at")
        return data

# Handson detail & update & delete


class HandsonRetrieveUpdateDestroySerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    class Meta:
        model = Handson
        fields = ('id', 'owner', 'title', 'headline', 'detail', 'require', 'document_url', 'meeting_url', 'movie_url', 'start_at', 'end_at', 'is_public')
        extra_kwargs = {
            'headline' : {
                'allow_blank' : True,
            },
            'detail' : {
                'allow_blank' : True,
            },
            'require' : {
                'allow_blank' : True,
            },
            'document_url' : {
                'allow_blank' : True,
            },
            'meeting_url' : {
                'allow_blank' : True,
            },
            'movie_url' : {
                'allow_blank' : True,
            },
        }
    def update(self, instance, validated_data):
        instance.title = validated_data['title']
        instance.headline = validated_data['headline']
        instance.detail = validated_data['detail']
        instance.require = validated_data['require']
        instance.document_url = validated_data['document_url']
        instance.meeting_url = validated_data['meeting_url']
        instance.movie_url = validated_data['movie_url']
        instance.start_at = validated_data['start_at']
        instance.end_at = validated_data['end_at']
        instance.is_public = validated_data['is_public']
        instance.save()
        return instance


class HandsonMemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = HandsonMember
        fields = ['user', 'handson', 'id']
        validators = [
            UniqueTogetherValidator(
                queryset=HandsonMember.objects.all(),
                fields=['user', 'handson']
            )
        ]
