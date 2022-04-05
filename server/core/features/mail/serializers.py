from rest_framework import serializers
# from rest_framework.reverse import reverse

from features.mail.models import Email
from features.user.models import User


# class RecipientsSerializer(serializers.Serializer):
#     class Meta:
#         model = User


class EmailSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='mailing-detail', lookup_field='pk')
    # url = serializers.SerializerMethodField(read_only=True)
    owner_email = serializers.ReadOnlyField(source='owner.email')
    sender_email = serializers.ReadOnlyField(source='sender.email')
    # recipients_email = serializers.ReadOnlyField(source='recipients.email')
    recipients = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Email
        fields = [
            'id',
            'url',
            'created',
            'is_read',
            'archived',
            'owner',
            'owner_email',
            'sender',
            'sender_email',
            'recipients',
            # 'recipients_email',
            'subject',
            'body'
        ]
        read_only_fields = ['id', 'url', 'created', 'is_read', 'archived']

    # ? not work
    # def __init__(self, *args, **kwargs):
    #     many = kwargs.pop('many', True)
    #     super(EmailSerializer, self).__init__(many=many, *args, **kwargs)

    # def get_url(self, obj):
    #     request = self.context.get('request')
    #     if request is None:
    #         return None
    #     return reverse("mailing-detail", kwargs={"pk": obj.pk}, request=request)