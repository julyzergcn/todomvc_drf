from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from todos import views as todos_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
]

router = routers.DefaultRouter()
router.register(r'todos', todos_views.TodoItemViewSet)

urlpatterns += [
    path('api/todos/set-all-completed/', todos_views.set_all_todos_completed),
    path('api/todos/clear-completed/', todos_views.clear_completed_todos),
    path('api/', include(router.urls)),
]
