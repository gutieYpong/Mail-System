# features/auth/serializers/register.py

from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist

from features.user.serializers import UserSerializer
from features.user.models import User


class RegisterSerializer(UserSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
    email = serializers.EmailField(required=True, write_only=True, max_length=128)

    # * Meta is defined in UserSerializer. Do we need to define it again?
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_active', 'created', 'updated']
        # * read_only_field = ['is_active', 'created', 'updated']

    def create(self, validated_data):
        try:
            user = User.objects.get(email=validated_data['email'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user
