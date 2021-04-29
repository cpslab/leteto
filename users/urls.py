from django.urls import path
from .views import HandsonListAPIView

urlpatterns = [
    path('<int:user_id>/handsons', HandsonListAPIView.as_view()),
]
