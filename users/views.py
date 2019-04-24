from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.authtoken.models import Token

from django.contrib.auth import authenticate
from .serializers import LoginSerializer, RegisterSerializer
from .models import User


class LoginView(APIView):
    """
    api for getting the token of the user
    """
    serializer_class = LoginSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=self.request.data)

        serializer.is_valid(raise_exception=True)
        token, _ = Token.objects.get_or_create(user=serializer.user)

        return Response({
            'token': token.key
            },
            headers = {
                'Authorization': 'Token '+token.key
            },
            status=200,
        )


class RegisterView(APIView):
    """
    api for creating user and creating a token for the user
    """
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data)

        serializer.is_valid(raise_exception=True)

        user = User(
            email=request.data['email'],
            first_name=request.data['first_name'],
            last_name=request.data['last_name'],
            password=request.data['password'],
            is_active=True)

        user.save()
        user.set_password(request.data['password'])
        user.save()
        
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key
            }, 
            headers = {
                'Authorization': 'Token '+token.key
            },
            status=200,
        )





