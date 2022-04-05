# features/routers.py

# from django.urls import include, path
from rest_framework.routers import SimpleRouter

from features.user.viewsets import UserViewSet
from features.auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from features.mail.viewsets import EmailViewSet


router = SimpleRouter()

# AUTHENTICATION
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/register', RegistrationViewSet, basename='auth-register')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
router.register(r'user', UserViewSet, basename='user')

# MAILING
router.register(r'mail', EmailViewSet, basename='mailing')

urlpatterns = [
    # path('auth/', include('rest_framework.urls')),
    *router.urls
]
