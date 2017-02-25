import json

from django.contrib.auth import authenticate, login, logout
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
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


class LoginView(APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = UserLoginSerializer(account)

                return Response(serialized.data)

            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)

        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username or password is invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)
