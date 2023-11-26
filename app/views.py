from django.http import HttpResponse
from django.template import loader
# Create your views here.
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from app.models import Topic, Heading, Article
from app.serializer import TopicSerializer, HeadingSerializer
import json


def home(request):
    template = loader.get_template("base.html")
    context = {

    }
    return HttpResponse(template.render(context, request))


class GetTree(APIView):

    def get(self, request, format=None):
        AllTopic = Topic.objects.all()
        AllHeading = Heading.objects.all()
        topic_data = TopicSerializer(AllTopic, many=True).data

        json_data = dict()

        for index, value in enumerate(topic_data):
            json_data[str(index)] = {
                'id': value['topic_id'],
                'name': value['topic_name'],
                'children': []
            }
            children_topic = Heading.objects.filter(topic=value['topic_id'])
            for id_topic, value_topic in enumerate(children_topic):
                json_children = {
                    'id': value_topic.heading_id,
                    'name': value_topic.heading_name,
                    'rank': value_topic.rank,
                    'children': []
                }
                children_heading = Article.objects.filter(
                    heading=value_topic.heading_id)
                for id_heading, value_heading in enumerate(children_heading):
                    json_heading = {
                        'id': value_heading.article_id,
                        'name': value_heading.article_name,
                        'rank': value_heading.rank,
                        'mapc': value_heading.mapc,
                    }
                    json_children['children'].append(json_heading)

                json_data[str(index)]['children'].append(json_children)

        return Response(json_data, status=status.HTTP_200_OK)
