from django.urls import path
from .views import HandsonList, HandsonDetail

urlpatterns = [
    path('', HandsonList.as_view()),
    path('<int:id>', HandsonDetail.as_view()),
]