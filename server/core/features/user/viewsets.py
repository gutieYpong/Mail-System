# features/user/viewsets.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters

from features.user.serializers import UserSerializer
from features.user.models import User


class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        qs = User.objects.all()
        return qs
        # return qs.filter(email__recipients__contains=self.request.user)

    # # list
    # def get_queryset(self):
    #     # if self.request.user.is_superuser:
    #     return User.objects.all()

    # retrieve
    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj


# class UserEmailViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserEmailSerializer
#     # permission_classes = [permissions.IsAuthenticated]
#     # lookup_field = 'pk'

#     def get_queryset(self):
#         qs = super().get_queryset()
#         u = qs.get(id=self.request.user.id)
#         inbox = u.emails_received.all()
#         sent = u.emails_sent.all()

#         print(f"inbox: {inbox}")
#         print(f"sent: {sent}")
#         return inbox | sent
