from django.http import HttpResponse
from django.template import loader
# Create your views here.
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from app.models import Topic, Heading, Article
from app.serializer import TopicSerializer, HeadingSerializer, ArticleSerializer
from app.text import NormalizerVietnamese
import json


def home(request):
    template = loader.get_template("base.html")
    context = {

    }
    return HttpResponse(template.render(context, request))


class TopicAPIView(APIView):
    def get(self, request):
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)


class HeadingAPIView(APIView):
    def get(self, request):
        id_topic = request.GET.get('id_topic')
        if id_topic is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        headings = Heading.objects.filter(topic_id=id_topic)
        serializer = HeadingSerializer(headings, many=True)
        json_data = sorted(serializer.data, key=lambda x: x["rank"])
        return Response(json_data, status=status.HTTP_200_OK)


class ArticleAPIView(APIView):
    def get(self, request):
        id_heading = request.GET.get('id_heading')
        id_parent = request.GET.get('id_parent')

        if id_heading is None or id_parent is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if id_parent == "null":
            id_parent = None

        articles = Article.objects.filter(
            heading=id_heading, parrent=id_parent)
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)


class QuestionAPIView(APIView):
    def post(self, request):
        content = request.data.get('content')
        if content is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        content = NormalizerVietnamese().normalize(content)
        return Response({"result": content}, status=status.HTTP_200_OK)


class SearchAPIView(APIView):
    def post(self, request):
        content = request.data.get('content')
        if content is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        content = NormalizerVietnamese().normalize(content)
        return Response({"result": content}, status=status.HTTP_200_OK)
