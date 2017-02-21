from rest_framework.viewsets import ModelViewSet

from .filters import IsOwnerOrAdminFilterBackend
from .serializers import *


class UserViewSet(ModelViewSet):
    """API endpoint to view and create users"""

    filter_backends = (IsOwnerOrAdminFilterBackend,)
    queryset = User.objects.all()
    serializer_class = UserViewSerializer

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.request.method == 'POST':
            serializer_class = UserRegisterSerializer
        elif self.request.method == 'PUT':
            serializer_class = UserPasswordChangeSerializer
        return serializer_class
