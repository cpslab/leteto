from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Handson, HandsonMember

# Handson list
class HandsonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Handson
        fields = ('id', 'owner', 'title', 'start_at', 'is_public', 'status')


class HandsonMemberSerializer(serializers.ModelSerializer):

    class  Meta:
        model = HandsonMember
        fields = ['user', 'handson']
        validators = [
            UniqueTogetherValidator(
            queryset= HandsonMember.objects.all(),
            fields=['user', 'handson']
            )
        ]
