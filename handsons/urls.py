from django.urls import path
from .views import HandsonListCreateAPIView, HandsonRetrieveUpdateAPIView

urlpatterns = [
    path('', HandsonListCreateAPIView.as_view()),
    path('<int:id>', HandsonRetrieveUpdateAPIView.as_view()),
]