from django.urls import path
from .views import YogaPoseListView, YogaPoseDetailView, login_user, logout_user, register_user


urlpatterns = [
    path('poses/', YogaPoseListView.as_view(), name='pose-list'),
    path('poses/<slug:slug>/', YogaPoseDetailView.as_view(), name='pose-detail'),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
]