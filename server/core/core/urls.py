"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # route for API login page, also config in settings.py
    path('', include('rest_framework.urls')),

    # route for admin page
    path('admin/', admin.site.urls),

    # ... include args ...
    # include((pattern_list, app_namespace), namespace=None)
    # Ref: https://docs.djangoproject.com/en/4.0/ref/urls/#include
    # path('api/', include(('features.routers', 'features'), namespace='features-api')),
    path('api/', include('features.routers')),
    # path('api/mail/', include('features.mail.urls')),
]
