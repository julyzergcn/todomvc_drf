from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from . import models, serializers


class TodoItemViewSet(viewsets.ModelViewSet):
    queryset = models.TodoItem.objects.all()\
        .filter(deleted=False).order_by('-created_at')
    serializer_class = serializers.TodoItemSerializer


@api_view()
def set_all_todos_completed(request):
    models.TodoItem.objects.filter(completed=False).update(completed=True)
    return Response(status=status.HTTP_200_OK)


@api_view()
def clear_completed_todos(request):
    models.TodoItem.objects.filter(completed=True).update(deleted=True)
    return Response(status=status.HTTP_200_OK)
