from django.urls import path
from .views import HandsonListCreateAPIView, HandsonRetrieveUpdateAPIView, HandsonMemberList, HandsonMemberRetrieveDestroyView, NestedHandsonMember


urlpatterns = [
    path('', HandsonListCreateAPIView.as_view()),
    path('<int:pk>', HandsonRetrieveUpdateAPIView.as_view()),
    path('<int:pk>/members', NestedHandsonMemberListCreateView.as_view()),
    path('<int:handson>/members/<int:pk>', NestedHandsonMemberRetrieveDestroyView.as_view()),
    path('handson_members/<int:pk>', HandsonMemberRetrieveDestroyView.as_view()),
]
