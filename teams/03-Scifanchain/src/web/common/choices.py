# 本类是公共类，抽象出各种选项属性供调用
from django.db.models.enums import IntegerChoices

class Status(IntegerChoices):
    STATUS_NORMAL = 1, '正常'
    STATUS_DELETEED = 0, '删除'
    STATUS_FROZEN = 2, '冻结'

class Display(IntegerChoices):
    SHOW = 1, '显示'
    HIDE = 0, '隐藏'

class Maturity(IntegerChoices):
    MATURITY_START = 1, '开始'
    MATURITY_DRAFT = 2, '草稿'
    MATURITY_WRITING = 3, '撰写'
    MATURITY_REDACT = 4, '编校'
    MATURITY_FINAL = 5, '定稿'

class StoryType(IntegerChoices):
    PERSON = 1, '人物'
    PLACE = 2, '地点'
    ERA = 3, '纪元'
    EVENT = 4, '事件'
