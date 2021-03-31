from django.urls import path
from .views import HandsonListCreateAPIView, HandsonRetrieveUpdateAPIView, HandsonMemberList


urlpatterns = [
    path('', HandsonListCreateAPIView.as_view()),
    path('<int:id>', HandsonRetrieveUpdateAPIView.as_view()),
    path('handson_members/', HandsonMemberList.as_view()),
]
