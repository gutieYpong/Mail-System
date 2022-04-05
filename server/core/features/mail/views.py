from rest_framework import generics, permissions
from rest_framework.decorators import action
# from django.shortcuts import get_object_or_404
# from rest_framework import generics, mixins, permissions, authentication
# from rest_framework.decorators import api_view
# from rest_framework.response import Response

from .models import Email
from features.user.models import User
from .serializers import EmailSerializer


class EmailListCreateAPIView(generics.ListCreateAPIView):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        print('...performing creation...')
        owner = User.objects.get(email=serializer.validated_data.get('owner'))
        sender = User.objects.get(email=serializer.validated_data.get('sender'))
        recipients = User.objects.get(email=serializer.validated_data.get('recipients'))

        if not owner:
            return "User not found."
        if not sender:
            return "sender not found."
        if not recipients:
            return "recipients not found."

        serializer.validated_data['owner'] = owner
        serializer.validated_data['sender'] = sender
        serializer.validated_data['recipients'] = recipients

        serializer.save()

        # serializer.save(user=self.request.user, content=content)
        # return super().perform_create(serializer)
        return None


class EmailDetailAPIView(generics.RetrieveAPIView):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer


class EmailDestoryAPIView(generics.DestroyAPIView):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    lookup_value = 'pk'

    def perform_destroy(self, instance):
        return super().perform_destroy(instance)


email_list_create_view = EmailListCreateAPIView.as_view()
email_detail_view = EmailDetailAPIView.as_view()
email_delete_view = EmailDestoryAPIView.as_view()
