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
from app.text import NormalizerVietnamese
import json


def home(request):
    template = loader.get_template("base.html")
    context = {

    }
    return HttpResponse(template.render(context, request))


class GetTree(APIView):

    def get(self, request, format=None):
        AllTopic = Topic.objects.all()
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
                    'id_parent': value['topic_id'],
                    'name': value_topic.heading_name,
                    'rank': value_topic.rank,
                    'children': []
                }
                children_heading = Article.objects.filter(
                    heading=value_topic.heading_id)
                for id_heading, value_heading in enumerate(children_heading):
                    json_heading = {
                        'id': value_heading.article_id,
                        'id_parent': value_topic.heading_id,
                        'id_grandparent': value['topic_id'],
                        'name': value_heading.article_name,
                        'rank': value_heading.rank,
                        'mapc': value_heading.mapc,
                    }
                    json_children['children'].append(json_heading)

                json_data[str(index)]['children'].append(json_children)

        return Response(json_data, status=status.HTTP_200_OK)


class Search(APIView):
    def post(self, request, format=None):
        content = request.data.get('content', None)
        if content is None:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            content = content.lower()
            json_data = {
                "answer": f"Đây là câu trả lời của {content}"
            }

            return Response(json_data, status=status.HTTP_200_OK)


class QuestionAndAnswer(APIView):
    def post(self, request, format=None):
        content = request.data.get('content', None)
        if content is None:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            content = content.lower()
            json_data = {
                "answer": f"Đây là câu trả lời của {content}"
            }

            return Response(json_data, status=status.HTTP_200_OK)


class PreprocessingDataset(APIView):
    def post(self, request, format=None):
        AllHeading = Heading.objects.all()
        for id, heading in enumerate(AllHeading):
            heading_id = heading.heading_id
            topic_name = heading.topic.topic_name

            data = open(f"static/demuc/{heading_id}.html", "r",
                        encoding="utf-8").read().splitlines()
            for id_data, value_data in enumerate(data):
                data[id_data] = NormalizerVietnamese(
                ).remove_html(value_data).split('\n')
                for id_line, value_line in enumerate(data[id_data]):
                    data[id_data][id_line] = data[id_data][id_line].strip()
                new_data = []
                for id_line, value_line in enumerate(data[id_data]):
                    if data[id_data][id_line] == '':
                        continue
                    new_data.append(data[id_data][id_line])
                data[id_data] = new_data[::]
            with open(f"static/demuc/output/{heading_id}.txt", "w", encoding="utf-8") as outfile:
                outfile.write("Chủ đề: " + topic_name + '\n')
                for index, value in enumerate(data):
                    if len(data[index]):
                        for id, _ in enumerate(data[index]):
                            outfile.write(data[index][id] + '\n')
        json_data = {
            "answer": data
        }
        return Response(json_data, status=status.HTTP_200_OK)
