from rest_framework import viewsets

from .models import Email
from .serializers import EmailSerializer


class InboxViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(recipients=self.request.user, archived=False)


class SentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(sender=self.request.user)


class ArchiveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(recipients=self.request.user, archived=True)


# class EmailViewSet(viewsets.ModelViewSet):
    # @action(detail=True, methods=['post'], url_path=r'compose')
    # def custom_create(self, request):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)

    #     return Response(serializer.data, status=status.HTTP_201_CREATED)

    # def create(self, request, *args, **kwargs):
    #     # clone = request.data.copy()
    #     # clone['owner'] = request.data['sender']
    #     # data = [request.data, clone]
    #     # serializer = self.get_serializer(data=data, many=True)

    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     # headers = self.get_success_headers(serializer.data)

    #     return Response({'data': serializer.data}, status=status.HTTP_201_CREATED,
    #                     # headers=headers
    #                     )

    # @action(detail=False, methods=["get"], url_path=r'inbox',)
    # def inbox_list(self, request):
    #     queryset = self.filter_queryset(self.get_queryset().filter(recipients=request.user))
    #     serializer = self.get_serializer(queryset, many=True)

    #     return Response(serializer.data, status=status.HTTP_200_OK)

    # @action(detail=False, methods=["get"], url_path=r'sent',)
    # def sent_list(self, request):
    #     queryset = self.filter_queryset(self.get_queryset().filter(sender=request.user))
    #     serializer = self.get_serializer(queryset, many=True)

    #     return Response(serializer.data, status=status.HTTP_200_OK)

    # @action(detail=True, methods=["get"], url_path=r'^sent/(?P<id>\d+)/$',)
    # def sent_retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance)

    #     return Response(serializer.data)