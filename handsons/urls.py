from django.urls import path
from .views import HandsonListCreateAPIView, HandsonRetrieveUpdateAPIView, HandsonMemberList, HandsonMemberRetrieveDestroyView, NestedHandsonMember


urlpatterns = [
    path('', HandsonListCreateAPIView.as_view()),
    path('<int:id>', HandsonRetrieveUpdateAPIView.as_view()),
    path('<int:pk>/members', NestedHandsonMember.as_view()),
    path('handson_members/', HandsonMemberList.as_view()),
    path('handson_members/<int:pk>', HandsonMemberRetrieveDestroyView.as_view()),
]
