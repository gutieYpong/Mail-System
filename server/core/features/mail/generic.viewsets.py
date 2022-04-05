from rest_framework import viewsets, mixins, status
# from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Email
from .serializers import EmailSerializer


class EmailGenericViewSet(
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.CreateModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
        ):
    """
        get -> list -> Queryset
        get -> retrieve -> Product Instance Detail View
        post -> create -> New Instance
        put -> Update
        patch -> Partial Update
        delete -> Destroy
    """
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        return self.request.user.accounts.all()

    def create(self, request, *args, **kwargs):
        clone = request.data.copy()
        clone['owner'] = request.data['sender']
        data = [request.data, clone]
        serialized = self.get_serializer(data=data, many=True)

        serialized.is_valid(raise_exception=True)
        self.perform_create(serialized)
        # headers = self.get_success_headers(serialized.data)

        return Response(serialized.data, status=status.HTTP_201_CREATED,
                        # headers=headers
                        )

    # @action(method=['post'], detail=True)
    # def the_create(self, request, *args, **kwargs):
    #     serialized = self.get_serializer(data=request.data)
    #     serialized.is_valid(raise_exception=True)
    #     serialized.validated_data()
    #     print('hihii')
    #     self.perform_create(serialized)

    #     return super().list(self, request, *args, **kwargs)


email_list_view = EmailGenericViewSet.as_view({'get': 'list'})
email_detail_view = EmailGenericViewSet.as_view({'get': 'retrieve'})
email_create_view = EmailGenericViewSet.as_view({'post': 'create'})
email_delete_view = EmailGenericViewSet.as_view({'delete': 'destroy'})
