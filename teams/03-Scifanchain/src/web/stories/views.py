from django.http.response import Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import StageListSerializer, StageDetailSerializer, StagePostSerializer
from .models import Stage
from rest_framework import generics
from .permissions import IsAdminUserOrReadOnly
from django.contrib.auth.models import User

class StageList(generics.ListCreateAPIView):
    queryset = Stage.objects.all()
    # serializer_class = StageListSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return StageListSerializer
        return StagePostSerializer


    def perform_create(self, serializer):
        # 有待完善：需结合验证，保证用户已登录并拥有相应权限
        serializer.save(owner=self.request.user, authors=[self.request.user.id,]) 
    

class StageDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUserOrReadOnly]

    queryset = Stage.objects.all()
    serializer_class = StageDetailSerializer

