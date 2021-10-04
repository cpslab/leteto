import re
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

class UserRegisterSerializer(RegisterSerializer):

    def validate(self, data):
        """
        Check that email format.
        """
        if not re.compile("[\w]+@ms\.dendai\.ac\.jp|[\w]+@cps\.im\.dendai\.ac\.jp").match(data["email"]):
            raise serializers.ValidationError("email format is not valid")
        
        """
        Check that password.
        """
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("The two password fields didn't match.")

        return data