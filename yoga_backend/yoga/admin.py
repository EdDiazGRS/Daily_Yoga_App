from django.contrib import admin
from .models import YogaPose, YouTubeVideo


@admin.register(YogaPose)
class YogaPoseAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}  
    list_display = ('name', 'difficulty', 'slug')

@admin.register(YouTubeVideo)
class YouTubeVideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'pose', 'video_id')
