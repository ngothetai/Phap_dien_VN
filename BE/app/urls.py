"""
URL configuration for system project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from app import views

urlpatterns = [
    path('', views.home, name='home_view'),
    path('api/topic/', views.TopicAPIView.as_view(), name='topic_api'),
    path('api/heading/', views.HeadingAPIView.as_view(), name='heading_api'),
    path('api/article/', views.ArticleAPIView.as_view(), name='article_api'),
    path('api/question/', views.QuestionAPIView.as_view(), name='question_api'),
    path('api/search/', views.SearchAPIView.as_view(), name='search_api'),
]
