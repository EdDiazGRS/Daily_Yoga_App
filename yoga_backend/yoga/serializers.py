from rest_framework import serializers 
from .models import YogaPose, YouTubeVideo


class YouTubeVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = YouTubeVideo
        fields = '__all__'

class YogaPoseSerializer(serializers.ModelSerializer):
    video = YouTubeVideoSerializer(read_only=True)

    class Meta:
        model = YogaPose
        fields = '__all__'