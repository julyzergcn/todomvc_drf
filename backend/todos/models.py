from django.db import models


class TodoItem(models.Model):
    title = models.CharField(max_length=1024)
    completed = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title
