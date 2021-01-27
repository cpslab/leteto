from django.urls import path
from .views import HandsonList, HandsonMemberList

urlpatterns = [
    path('', HandsonList.as_view()),
    path('handson_members/', HandsonMemberList.as_view()),
]

