from rest_framework import serializers
from rest_framework.reverse import reverse

from features.mail.models import Email
from features.user.models import User


class EmailSerializer(serializers.ModelSerializer):
    # URL_ROUTES = {
    #     'mail': 'mailing',
    #     'inbox': 'mailbox-inbox',
    #     'sent': 'mailbox-sent',
    #     'archive': 'mailbox-archive'
    #     }
    # url = serializers.HyperlinkedIdentityField(view_name='mailing-detail', lookup_field='pk')
    url = serializers.SerializerMethodField(read_only=True)
    sender_email = serializers.ReadOnlyField(source='sender.email')
    # recipients = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
    recipients = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        many=True,
        read_only=False,
        slug_field='email'
        )

    class Meta:
        model = Email
        fields = [
            'id',
            'url',
            'created',
            'is_read',
            'archived',
            'sender',
            'sender_email',
            'recipients',
            'subject',
            'body'
        ]
        read_only_fields = ['id', 'url', 'created', 'is_read', 'archived', 'sender']

    # ? not work
    # def __init__(self, *args, **kwargs):
    #     many = kwargs.pop('many', True)
    #     super(EmailSerializer, self).__init__(many=many, *args, **kwargs)

    def get_url(self, obj):
        mailbox = self.context.get('mailbox')
        request = self.context.get('request')
        if request is None:
            return None
        # reverse_url = f"{self.URL_ROUTES[request.path.split('/')[2]]}-detail"

        return reverse(
            viewname='mail-mailbox-detail',
            kwargs={'mailbox': mailbox, 'pk': obj.pk},
            request=request
            )
