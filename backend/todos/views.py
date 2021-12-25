from rest_framework import viewsets

from . import models, serializers


class TodoItemViewSet(viewsets.ModelViewSet):
    queryset = models.TodoItem.objects.all().filter(deleted=False)
    serializer_class = serializers.TodoItemSerializer
