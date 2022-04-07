# features/routers.py

from rest_framework.routers import SimpleRouter

from features.user.viewsets import UserViewSet
from features.auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from features.mail.viewsets import EmailCreateViewSet, EmailListRetrieveDestoryViewSet

router = SimpleRouter()

# AUTHENTICATION
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/register', RegistrationViewSet, basename='auth-register')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
router.register(r'user', UserViewSet, basename='user')

# MAILING
router.register(r'mail/compose', EmailCreateViewSet, basename='mail-create')
router.register(
                r'mail/(?P<mailbox>[\w\-]+)',
                EmailListRetrieveDestoryViewSet,
                basename='mail-mailbox')

# TESTING
# router.register(r'mailbox', UserEmailViewSet, basename='mailbox')

urlpatterns = [
    # path('auth/', include('rest_framework.urls')),
    # path(
    #     'mail/compose',
    #     EmailViewSet.as_view({'post': 'create'}),
    #     name='Create Mail',
    # ),
    # re_path(
    #     r'mail/(?P<mailbox>[\w\-]+)',
    #     EmailViewSet.as_view({'get': 'list'}),
    #     name='mail-mailbox',
    # ),
    # re_path(
    #     r'mail/(?P<mailbox>[\w\-]+)',
    #     EmailViewSet.as_view({'get': 'retrieve'}),
    #     name='mail-mailbox-detail',
    #     # name='Retrieve Mail',
    # ),
    *router.urls
]
