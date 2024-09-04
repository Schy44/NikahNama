from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from NN import views


urlpatterns = [
    #   path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('home/', views.home)

]
