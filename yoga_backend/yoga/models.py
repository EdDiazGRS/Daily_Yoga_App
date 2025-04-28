from django.db import models

class YogaPose(models.Model):
    name = models.CharField(max_length = 100)
    sanskrit_name = models.CharField(max_length = 100)
    difficulty = models.CharField(max_length = 100)
    pose_type = models.CharField(max_length = 100)
    duration = models.CharField(max_length = 100)
    instructions = models.TextField()
    benefits = models.TextField()
    slug = models.SlugField(unique = True)

    def __str__(self):
        return self.name
    

class YouTubeVideo(models.Model):
    pose = models.OneToOneField(YogaPose, related_name='video', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    video_id = models.CharField(max_length=50)
    url = models.URLField()
    thumbnail_url = models.URLField(blank=True)
    channel_title = models.CharField(max_length=100, blank=True)
    published_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f' {self.title} {self.pose.name}'

