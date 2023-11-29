from rest_framework import serializers
from app.models import Topic, Heading, Article


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'


class HeadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Heading
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
