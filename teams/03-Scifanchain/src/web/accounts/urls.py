from django.urls import path
from .views import SigninView
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    # path('login/', SigninView.as_view(), name='login'),
    # path('password_change/', auth_views.PasswordChangeView.as_view(), name='password_change'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('stage/<int:id>/', views.stage, name='stage'),
]
