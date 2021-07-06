from django.contrib.auth.models import User
from django.db import models
from mdeditor.fields import MDTextField
from django.forms import ModelForm, TextInput, Textarea
from django.template.loader import render_to_string
from common.choices import Status, Display


class Category(models.Model):
    name = models.CharField(max_length=510, verbose_name="分类名称")
    status = models.PositiveSmallIntegerField(default=Status.STATUS_NORMAL, choices=Status.choices, verbose_name="状态")
    is_nav = models.BooleanField(default=False, verbose_name="是否为导航")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="作者")
    created_time = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = verbose_name_plural = "分类"
    
    def __str__(self) -> str:
        return self.name

    @classmethod
    def get_navs(cls):
        categories = cls.objects.filter(status=Status.STATUS_NORMAL)
        navs = categories.filter(is_nav=True)
        menus = categories.filter(is_nav=False)

        return {
            'navs':navs,
            'menus':menus,
        }


class Tag(models.Model):
    name = models.CharField(max_length=10, verbose_name="标签名称")
    status = models.PositiveSmallIntegerField(
        default=Status.STATUS_NORMAL, choices=Status.choices,  verbose_name="状态")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="作者")
    created_time = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = verbose_name_plural = "标签"

    def __str__(self) -> str:
        return self.name


class Archive(models.Model):
    year = models.CharField(verbose_name='年份', max_length=10)

    class Meta:
        verbose_name = verbose_name_plural = "年份"

    def __str__(self) -> str:
        return self.year

class Post(models.Model):
    title = models.CharField(max_length=200, verbose_name="标题")
    desc = models.CharField(max_length=1024, blank=True, verbose_name="摘要")
    content = MDTextField(
        verbose_name="正文", help_text="请使用MarkDown格式", default="")
    status = models.PositiveSmallIntegerField(
        default=Status.STATUS_NORMAL, choices=Status.choices, verbose_name="状态")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name="分类")
    tag = models.ManyToManyField(Tag, verbose_name="标签")
    archive = models.ForeignKey(
        Archive, on_delete=models.CASCADE, null=True, verbose_name="存档", blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="作者")
    pv = models.PositiveIntegerField(default=1)
    uv = models.PositiveIntegerField(default=1)
    created_time = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = verbose_name_plural = "文章"
        ordering = ['-id']

    def __str__(self) -> str:
        return self.title

    @staticmethod
    def get_by_tag(tag_id):
        try:
            tag = Tag.objects.get(id=tag_id)
        except Tag.DoesNotExist:
            tag = None
            post_list = []
        else:
            post_list = tag.post_set.filter(status=Status.STATUS_NORMAL).select_related('owner', 'category')
        
        return post_list, tag

    @staticmethod
    def get_by_category(category_id):
        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            category = None
            post_list = []
        else:
            post_list = category.post_set.filter(status=Status.STATUS_NORMAL).select_related('owner', 'category')

        return post_list, category

    @classmethod
    def latest_posts(cls):
        queryset = cls.objects.filter(status=Status.STATUS_NORMAL)
        return queryset

    @classmethod
    def hot_posts(cls):
        return cls.objects.filter(status=Status.STATUS_NORMAL).only('id', 'title').order_by('-pv')


class Comment(models.Model):
    target = models.ForeignKey(
        Post, verbose_name="评论目标", on_delete=models.CASCADE)
    content = models.CharField(max_length=2000, verbose_name="内容")
    nickname = models.CharField(max_length=50, verbose_name="昵称")
    email = models.EmailField(verbose_name="邮箱", blank=True, null=True)
    status = models.PositiveSmallIntegerField(
        default=Status.STATUS_NORMAL, choices=Status.choices, verbose_name="状态")
    created_time = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = verbose_name_plural = "评论"


class CommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ['content', 'nickname', 'email']
        widgets = {
            'nickname': TextInput(attrs={'class': 'form-control form-control-sm',}),
            'content': Textarea(attrs={'class': 'form-control form-control-sm', 'rows': 5,}),
            'email': TextInput(attrs={'class': 'form-control form-control-sm',}),
        }


class Link(models.Model):
    title = models.CharField(max_length=50, verbose_name="标题")
    href = models.URLField(verbose_name="链接")
    status = models.PositiveSmallIntegerField(
        default=Status.STATUS_NORMAL, choices=Status.choices, verbose_name="状态")
    weight = models.PositiveSmallIntegerField(default=1, choices=zip(
        range(1, 6), range(1, 6)), verbose_name="权重", help_text="权重高展示顺序靠前")
    owner = models.ForeignKey(User, verbose_name="作者",
                              on_delete=models.CASCADE)
    created_time = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = verbose_name_plural = "友情链接"


class Sidebar(models.Model):
    SIDE_TYPE = (
        (1, 'HTML'),
        (2, '最新文章'),
        (3, '最热文章'),
        (4, '最新评论'),
    )

    DISPLAY_HTML = 1
    DISPLAY_LATEST = 2
    DISPLAY_HOT = 3
    DISPLAY_COMMENT = 4

    title = models.CharField(max_length=50, verbose_name="标题")
    display_type = models.PositiveSmallIntegerField(
        default=1, choices=SIDE_TYPE, verbose_name="展示类型")
    content = models.CharField(
        max_length=500, blank=True, verbose_name="内容", help_text="如果设置的不是HTML类型，可为空")
    status = models.PositiveSmallIntegerField(
        default=Display.SHOW, choices=Display.choices, verbose_name="是否显示")
    owner = models.ForeignKey(User, verbose_name="作者",
                              on_delete=models.CASCADE)
    created_time = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = verbose_name_plural = "侧边栏"

    def __str__(self):
        return self.title

    def _render_latest(self):
        pass

    @classmethod
    def get_all(cls):
        return cls.objects.filter(status=Display.SHOW)

    def content_html(self):
        """ 通过直接渲染模板 """
        from .models import Post  # 避免循环引用
        from .models import Comment

        result = ''
        if self.display_type == self.DISPLAY_HTML:
            result = self.content
        elif self.display_type == self.DISPLAY_LATEST:
            context = {
                'posts': Post.latest_posts()
            }
            result = render_to_string(
                'blogs/sidebar_posts.html', context)
        elif self.display_type == self.DISPLAY_HOT:
            context = {
                'posts': Post.hot_posts()
            }
            result = render_to_string(
                'blogs/sidebar_posts.html', context)
        elif self.display_type == self.DISPLAY_COMMENT:
            context = {
                'comments': Comment.objects.filter(status=Status.STATUS_NORMAL)
            }
            result = render_to_string(
                'blogs/sidebar_comments.html', context)
        return result
