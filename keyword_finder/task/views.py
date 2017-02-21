from rest_framework import viewsets, permissions

from task.filters import IsOwnerOrAdminFilterBackend
from task.models import Task
from task.serializers import TaskUserSerializer, TaskAdminSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """API endpoint to view and create tasks"""

    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (IsOwnerOrAdminFilterBackend,)
    queryset = Task.objects.all()

    def get_serializer_class(self):
        if self.request.user.is_admin:
            return TaskAdminSerializer
        return TaskUserSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
