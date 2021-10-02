from django.urls import path
from .views import HandsonListCreateAPIView, HandsonRetrieveUpdateDestroyAPIView, NestedHandsonContentListCreateView, NestedHandsonContentPassMemberListCreateView, NestedHandsonContentRetrieveUpdateDestroyView, NestedHandsonMemberListCreateView, NestedHandsonMemberRetrieveDestroyView, NestedHandsonContentPassMemberRetrieveDestroyView


urlpatterns = [
    path('', HandsonListCreateAPIView.as_view()),
    path('<int:pk>', HandsonRetrieveUpdateDestroyAPIView.as_view()),
    path('<int:pk>/members', NestedHandsonMemberListCreateView.as_view()),
    path('<int:handson>/members/<int:pk>', NestedHandsonMemberRetrieveDestroyView.as_view()),
    path('<int:pk>/contents', NestedHandsonContentListCreateView.as_view()),
    path('<int:handson>/contents/<int:pk>', NestedHandsonContentRetrieveUpdateDestroyView.as_view()),
    path('<int:handson>/contents/<int:pk>/completion', NestedHandsonContentPassMemberListCreateView.as_view()),
    path('<int:handson>/contents/<int:content>/completion/<int:pk>', NestedHandsonContentPassMemberRetrieveDestroyView.as_view()),
]
