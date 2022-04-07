# features/user/serializers.py

from rest_framework import serializers

from features.user.models import User
# from features.mail.models import Email


class UserSerializer(serializers.ModelSerializer):
    # email = serializers.PrimaryKeyRelatedField(many=True, queryset=Email.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'created', 'updated']
        read_only_field = ['is_active', 'created', 'updated']


# class UserEmailSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Email
#         fields = '__all__'
