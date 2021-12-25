from rest_framework import serializers

from . import models


class TodoItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.TodoItem
        fields = ['pk', 'title', 'completed', 'created_at']
