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
    path('api/get_tree/', views.GetTree.as_view(), name='get_tree_view'),
    path('api/search/', views.Search.as_view(), name='search_view'),
    path('api/qaa/', views.QuestionAndAnswer.as_view(), name='qaa_view'),
]
