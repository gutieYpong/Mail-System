from rest_framework import viewsets, status, mixins
from rest_framework.response import Response

from .models import Email
from .serializers import EmailSerializer
from features.user.mixins import EmailPermissionMixin


class EmailCreateViewSet(EmailPermissionMixin,
                         mixins.CreateModelMixin,
                         viewsets.GenericViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class EmailListRetrieveDestoryViewSet(EmailPermissionMixin,
                                      mixins.RetrieveModelMixin,
                                      mixins.DestroyModelMixin,
                                      mixins.ListModelMixin,
                                      viewsets.GenericViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    lookup_field = 'pk'
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        mailbox = self.kwargs.get('mailbox')

        if(mailbox == 'inbox'):
            return qs.filter(recipients=self.request.user, archived=False)
        elif(mailbox == 'sent'):
            return qs.filter(sender=self.request.user)
        elif(mailbox == 'archive'):
            return qs.filter(recipients=self.request.user, archived=True)
        else:
            return qs.none()

    def get_serializer_context(self):
        context = super(EmailListRetrieveDestoryViewSet, self).get_serializer_context()
        context['mailbox'] = self.kwargs.get('mailbox')
        return context

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if(not queryset.exists()):
            return Response({'list': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        # page = self.paginate_queryset(queryset)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)
