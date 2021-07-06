from django.urls import path

from . import views
from .views import PostDetailView, PostListView, CategoryView, TagView, IndexView, CommentView

app_name = 'blogs'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('category/<category_id>', CategoryView.as_view(), name='category'),
    path('tag/<tag_id>', TagView.as_view(), name='tag'),
    path('post/<post_id>', PostDetailView.as_view(), name='detail'),
    path('comment/', CommentView.as_view(), name='comment'),
]
