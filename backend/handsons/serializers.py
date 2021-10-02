from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_framework.validators import UniqueTogetherValidator
from .models import ContentPassMember, Handson, CustomUser, HandsonContent, HandsonMember
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


# Handson Serializer
class HandsonReadListSerializer(serializers.ModelSerializer):

    owner = UserSerializer()

    class Meta:
        model = Handson
        fields = ['id', 'owner', 'title', 'start_at', 'end_at']

class HandsonReadSerializer(serializers.ModelSerializer):

    owner = UserSerializer()
    members = SerializerMethodField()
    contents = SerializerMethodField()

    class Meta:
        model = Handson
        fields = ['id', 'owner', 'title', 'headline', 'detail', 'require', 'document_url',
                  'meeting_url', 'movie_url', 'start_at', 'end_at', 'is_public', 'members', 'contents']

    def get_members(self, obj):
        try:
            members = HandsonMemberReadSerializer(HandsonMember.objects.all().filter(handson=Handson.objects.get(id=obj.id)), many=True).data
            return members
        except:
            members = None
            return members

    def get_contents(self, obj):
        try:
            contents = HandsonContentReadSerializer(HandsonContent.objects.all().filter(handson=Handson.objects.get(id=obj.id)), many=True).data
            return contents
        except:
            contents = None
            return contents

class HandsonWriteSerializer(serializers.ModelSerializer):

    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Handson
        fields = ['id', 'owner', 'title', 'headline', 'detail', 'require', 'document_url',
                  'meeting_url', 'movie_url', 'start_at', 'end_at', 'is_public']
        read_only_fields = ['owner']

    def validate(self, data):
        """
        Check that start_at is before end_at.
        """
        if data['start_at'] >= data['end_at']:
            raise serializers.ValidationError("end_at must occur after start_at")
        return data


# Handson Member Serializer
class HandsonMemberReadSerializer(serializers.ModelSerializer):

    member = UserSerializer()

    class Meta:
        model = HandsonMember
        fields = ['id', 'member', 'handson']

class HandsonMemberWriteSerializer(serializers.ModelSerializer):

    member = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = HandsonMember
        fields = ['id', 'member', 'handson']
        read_only_fields = ['member']
        validators = [
            UniqueTogetherValidator(
                queryset=HandsonMember.objects.all(),
                fields=['member', 'handson']
            )
        ]


# Handson Content Serializer
class HandsonContentReadSerializer(serializers.ModelSerializer):

    passed_members = SerializerMethodField()

    class Meta:
        model = HandsonContent
        fields = ['id', 'handson', 'content', 'passed_members']

    def get_passed_members(self, obj):
        try:
            members = HandsonContentPassMemberReadSerializer(ContentPassMember.objects.all().filter(content=HandsonContent.objects.get(id=obj.id)), many=True).data
            return members
        except:
            members = None
            return members

class HandsonContentWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = HandsonContent
        fields = ['id', 'handson', 'content']

    def create(self, validated_data):
        handson = validated_data.pop('handson')
        owner = handson.owner
        if owner == self.context['request'].user:
            content = HandsonContent.objects.create(handson=handson, **validated_data)
            return content
        else:
            raise serializers.ValidationError("you are not handson owner")


# Content Pass Serializer
class HandsonContentPassMemberReadSerializer(serializers.ModelSerializer):

    member = UserSerializer()

    class Meta:
        model = ContentPassMember
        fields = ['id', 'content', 'member']
        read_only_fields = ['member']

class HandsonContentPassMemberWriteSerializer(serializers.ModelSerializer):

    member = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = ContentPassMember
        fields = ['id', 'content', 'member']
        read_only_fields = ['member']
        validators = [
            UniqueTogetherValidator(
                queryset=ContentPassMember.objects.all(),
                fields=['content', 'member']
            )
        ]

    def create(self, validated_data):
        member = validated_data.pop('member')
        content = validated_data.pop('content')
        handson = content.handson
        handson_members = HandsonMember.objects.filter(handson=handson)
        members = [handson_member.member for handson_member in handson_members]
        if member in members and member == self.context['request'].user:
            content_pass_member = ContentPassMember.objects.create(member=member, content=content,**validated_data)
            return content_pass_member
        else:
            raise serializers.ValidationError("you are not handson member")
