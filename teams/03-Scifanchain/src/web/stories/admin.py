from django.contrib import admin
from .models import Stage


# @admin.register(Stage)
# class StageAdmin(admin.ModelAdmin):
#     list_display = ('title', 'status', 'created_time')
#     fields = ('title', 'status', 'maturity', 'content', 'version')

#     def save_model(self, request, obj, form, change):
#         obj.owner = request.user
#         stage_author = 
#         return super(StageAdmin, self).save_model(request, obj, form, change)