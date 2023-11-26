from django.test import TestCase

# Create your tests here.
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse


class TreeAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_tree(self):
        response = self.client.get(reverse('get_tree_view'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
