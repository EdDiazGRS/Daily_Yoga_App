import requests
from django.core.management.base import BaseCommand
from django.conf import settings
from yoga.models import YogaPose, YouTubeVideo

class Command(BaseCommand):
    help = 'Fetch YouTube videos for each yoga pose and save the top result'

    def handle(self, *args, **kwargs):
        api_key = settings.YOUTUBE_API_KEY

        for pose in YogaPose.objects.all():
            query = f"{pose.name} yoga pose"
            url = "https://www.googleapis.com/youtube/v3/search"
            params = {
                "part": "snippet",
                "q": query,
                "type": "video",
                "maxResults": 1,
                "key": api_key
            }

            response = requests.get(url, params=params)
            data = response.json()

            if data['items']:
                video_data = data['items'][0]
                video_id = video_data['id']['videoId']
                snippet = video_data['snippet']

                # Avoid duplicates
                if hasattr(pose, 'video'):
                    self.stdout.write(self.style.WARNING(f"{pose.name} already has a video. Skipping."))
                    continue

                YouTubeVideo.objects.create(
                    pose=pose,
                    title=snippet['title'],
                    video_id=video_id,
                    url=f"https://www.youtube.com/watch?v={video_id}",
                    thumbnail_url=snippet['thumbnails']['high']['url'],
                    channel_title=snippet.get('channelTitle', ''),
                    published_at=snippet.get('publishedAt', None),
                )

                self.stdout.write(self.style.SUCCESS(f"Added video for {pose.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"No results found for {pose.name}"))
