from django.contrib import admin
from app.models import *


# Register your models here.
@admin.register(Topic)
class AuthorTopics(admin.ModelAdmin):
    pass


@admin.register(Heading)
class AuthorHeading(admin.ModelAdmin):
    pass


@admin.register(Article)
class AuthorArticle(admin.ModelAdmin):
    pass
