from django.db import models


# Create your models here.

class Topic(models.Model):
    topic_id = models.CharField(primary_key=True, max_length=50, unique=True)
    topic_name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.topic_name


class Heading(models.Model):
    heading_id = models.CharField(primary_key=True, max_length=50, unique=True)
    heading_name = models.CharField(max_length=100)
    rank = models.IntegerField()
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.heading_name


class Article(models.Model):
    """
    Article model
        {
            "ID": "5102DF50-10AF-4048-B91D-1DC19D0AD38F",
            "ChiMuc": "I",
            "MAPC": "01001000000000001000",
            "TEN": "Chương I Những quy định chung",
            "ChuDeID": "c3b69131-2931-4f67-926e-b244e18e8081",
            "DeMucID": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
        }
    """
    article_id = models.CharField(primary_key=True, max_length=50, unique=True)
    rank = models.CharField(max_length=50)
    mapc = models.CharField(max_length=50)
    article_name = models.CharField(max_length=100)
    heading = models.ForeignKey(Heading, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.article_name
