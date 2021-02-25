from django.urls import path
from .views import HandsonListCreateAPIView, HandsonDetail

urlpatterns = [
    path('', HandsonListCreateAPIView.as_view()),
    path('<int:id>', HandsonDetail.as_view()),
]