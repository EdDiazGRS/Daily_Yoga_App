from django.shortcuts import render
from rest_framework import generics
from .models import YogaPose
from .serializers import YogaPoseSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status

class YogaPoseListView(generics.ListAPIView):
    queryset = YogaPose.objects.all()
    serializer_class = YogaPoseSerializer

class YogaPoseDetailView(generics.RetrieveAPIView):
    queryset = YogaPose.objects.all()
    serializer_class = YogaPoseSerializer
    lookup_field = 'slug'


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Please provide both username and password'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    # Check if user already exists
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    # Create user
    user = User.objects.create_user(username=username, password=password)
    
    return Response({'message': 'User registered successfully'}, 
                    status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    # Authenticate user
    user = authenticate(username=username, password=password)
    
    if not user:
        return Response({'error': 'Invalid credentials'}, 
                        status=status.HTTP_401_UNAUTHORIZED)
    
    # Create or get token
    token, created = Token.objects.get_or_create(user=user)
    
    return Response({
        'token': token.key,
        'username': user.username,
        'id': user.id
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout_user(request):
    # This endpoint requires authentication
    request.user.auth_token.delete()
    return Response({'message': 'Logout successful'}, 
                    status=status.HTTP_200_OK)