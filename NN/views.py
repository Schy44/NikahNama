from django.shortcuts import render
from NN.models import Profile, User
from NN.serializers import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError
from rest_framework import serializers

from rest_framework import serializers  # Add this import at the top


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            # Now 'user' should be present
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)

            return Response({
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'user': {
                    'username': user.username,
                    'email': user.email,
                }
            }, status=status.HTTP_200_OK)

        except serializers.ValidationError as ve:
            # Handle specific validation errors
            return Response({'detail': ve.detail}, status=status.HTTP_400_BAD_REQUEST)

        except KeyError as ke:
            # Handle missing 'user' key
            return Response({'detail': 'User not found in validated data'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        """
        Handle user registration.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            # Return tokens and user info
            return Response({
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'user': {
                    'username': user.username,
                    'email': user.email,
                }
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Home view to demonstrate authenticated access


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def home(request):
    """
    View accessible only to authenticated users, demonstrating GET and POST handling.
    """
    if request.method == 'GET':
        response = f"Hey {request.user}, you are seeing a GET response."
        return Response({'response': response}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.data.get("text")
        response = f"Hey {request.user}, your text is {text}."
        return Response({'response': response}, status=status.HTTP_200_OK)

    # Fallback for unsupported methods
    return Response({}, status=status.HTTP_400_BAD_REQUEST)
