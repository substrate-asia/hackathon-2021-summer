from django.db.models import fields
from rest_framework import serializers
from .models import Stage
from django.contrib.auth.models import User


class StageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = [
            'id',
            'title',
            'created_time',
            'maturity',
            'version',
            'content',
            'owner',
            'authors',
        ]

class StagePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = [
            'id',
            'title',
            'created_time',
            'maturity',
            'content',
        ]

class StageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = '__all__'
        # exclude = ['owner']
