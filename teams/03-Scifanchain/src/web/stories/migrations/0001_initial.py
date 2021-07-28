# Generated by Django 3.2.3 on 2021-06-19 02:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Era',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cycle', models.PositiveSmallIntegerField(verbose_name='纪周')),
                ('veins', models.PositiveSmallIntegerField(verbose_name='纪脉')),
                ('point', models.PositiveSmallIntegerField(verbose_name='纪点')),
                ('dimen', models.PositiveSmallIntegerField(verbose_name='纪维')),
                ('version', models.IntegerField(default=1, verbose_name='版本')),
                ('created_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('updated_time', models.DateTimeField(auto_now_add=True, verbose_name='修改时间')),
            ],
            options={
                'verbose_name': '纪元',
                'verbose_name_plural': '纪元',
            },
        ),
        migrations.CreateModel(
            name='Stage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='标题')),
                ('content', models.TextField(default='', verbose_name='内容')),
                ('maturity', models.PositiveSmallIntegerField(choices=[(1, '开始'), (2, '草稿'), (3, '撰写'), (4, '编校'), (5, '定稿')], default=1, verbose_name='阶段')),
                ('status', models.PositiveSmallIntegerField(choices=[(1, '正常'), (0, '删除'), (2, '冻结')], default=1, verbose_name='状态')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, '人物'), (2, '地点'), (3, '纪元'), (4, '事件')], default=4, verbose_name='类型')),
                ('version', models.IntegerField(default=1, verbose_name='版本')),
                ('created_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('updated_time', models.DateTimeField(auto_now_add=True, verbose_name='最近修改时间')),
                ('authors', models.ManyToManyField(related_name='authors', to=settings.AUTH_USER_MODEL, verbose_name='参与者')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='创建者')),
            ],
            options={
                'verbose_name': '片断',
                'verbose_name_plural': '片断',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='HistoricalStage',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='标题')),
                ('content', models.TextField(default='', verbose_name='内容')),
                ('maturity', models.PositiveSmallIntegerField(choices=[(1, '开始'), (2, '草稿'), (3, '撰写'), (4, '编校'), (5, '定稿')], default=1, verbose_name='阶段')),
                ('status', models.PositiveSmallIntegerField(choices=[(1, '正常'), (0, '删除'), (2, '冻结')], default=1, verbose_name='状态')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, '人物'), (2, '地点'), (3, '纪元'), (4, '事件')], default=4, verbose_name='类型')),
                ('version', models.IntegerField(default=1, verbose_name='版本')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL, verbose_name='创建者')),
            ],
            options={
                'verbose_name': 'historical 片断',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]