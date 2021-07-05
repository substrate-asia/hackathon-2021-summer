from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
from django.db.models.fields import BooleanField
from django.db.models.fields.related import ForeignKey
from django.forms.widgets import SelectMultiple
from rest_framework.fields import HiddenField
from common.choices import Status, Maturity, StoryType
from simple_history.models import HistoricalRecords
from django.forms import ModelForm, TextInput, Textarea


class Stage(models.Model):
    title = models.CharField(max_length=50, verbose_name="标题")
    content = models.TextField(verbose_name="内容", default="")
    owner = models.ForeignKey(User, verbose_name="创建者", on_delete=models.CASCADE)
    authors = models.ManyToManyField(
        User, verbose_name="参与者", related_name='authors')
    maturity = models.PositiveSmallIntegerField(
        default=Maturity.MATURITY_START,
        choices=Maturity.choices,
        verbose_name="阶段")
    status = models.PositiveSmallIntegerField(
        default=Status.STATUS_NORMAL,
        choices=Status.choices,
        verbose_name="状态")
    type = models.PositiveSmallIntegerField(
        default=StoryType.EVENT,
        choices=StoryType.choices,
        verbose_name="类型"
    )
    version = models.IntegerField(verbose_name="版本", default=1)
    created_time = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_time = models.DateTimeField(auto_now_add=True, verbose_name="最近修改时间")
    history = HistoricalRecords(
        excluded_fields=['created_time', 'updated_time', 'owner_id'])

    class Meta:
        verbose_name = verbose_name_plural = "片断"
        ordering = ['-id']

    def __str__(self) -> str:
        return self.title
        

class StageForm(ModelForm):
    class Meta:
        model = Stage
        fields = ['title', 'content']
        widgets = {
            'title': TextInput(attrs={'class': 'form-control form-control-sm', }),
            'content': Textarea(attrs={'class': 'form-control form-control-sm', 'rows': 5}),
        }


class Era(models.Model):
    cycle = models.PositiveSmallIntegerField(verbose_name='纪周')
    veins = models.PositiveSmallIntegerField(verbose_name='纪脉')
    point = models.PositiveSmallIntegerField(verbose_name='纪点')
    dimen = models.PositiveSmallIntegerField(verbose_name='纪维')
    version = models.IntegerField(verbose_name="版本", default=1)
    created_time = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_time = models.DateTimeField(auto_now_add=True, verbose_name="修改时间")

    class Meta:
        verbose_name = verbose_name_plural = "纪元"
