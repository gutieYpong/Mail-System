from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Email
from .serializers import EmailSerializer
from features.user.mixins import EmailPermissionMixin


class EmailViewSet(EmailPermissionMixin, viewsets.ModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    # permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(owner=self.request.user)

    # def get_object(self):
    #     qs = super().get_object()
    #     return qs.filter(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        clone = request.data.copy()
        clone['owner'] = request.data['sender']
        data = [request.data, clone]
        serializer = self.get_serializer(data=data, many=True)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # headers = self.get_success_headers(serializer.data)

        return Response({'data': serializer.data}, status=status.HTTP_201_CREATED,
                        # headers=headers
                        )
