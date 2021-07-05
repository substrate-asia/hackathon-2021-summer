from django.urls import path
from . import views

app_name = 'stories'

urlpatterns = [
    path('', views.StageList.as_view(), name='index'),
    path('<int:pk>/', views.StageDetail.as_view(), name='detail'),
]
