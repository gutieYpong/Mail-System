from django.urls import path

# from . import views
from . import viewsets


# urlpatterns = [
#     path('', views.email_list_create_view, name='email-list'),  # list, create
#     path('<int:pk>/', views.email_detail_view, name='email-detail'),  # detail
#     path('<int:pk>/delete/', views.email_delete_view, name='email-delete')  # delete
# ]

urlpatterns = [
    path('', viewsets.email_list_view, name='email-list'),  # list
    path('create/', viewsets.email_create_view, name='email-create'),  # create
    path('<int:pk>/', viewsets.email_detail_view, name='email-detail'),  # detail
    path('<int:pk>/delete/', viewsets.email_delete_view, name='email-delete')  # delete
]

# email_list_create_view
# email_detail_view
# email_delete_view

# email_list_view
# email_detail_view
# email_create_view
# email_delete_view
