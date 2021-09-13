from django.urls import path
from .views import HandsonListCreateAPIView, HandsonRetrieveUpdateAPIView, NestedHandsonContentListCreateView, NestedHandsonContentRetrieveUpdateDestroyView, NestedHandsonMemberListCreateView, NestedHandsonMemberRetrieveDestroyView, NestedHandsonContentPassMemberView, NestedHandsonContentPassMemberRetrieveDestroyView


urlpatterns = [
    path('', HandsonListCreateAPIView.as_view()),
    path('<int:pk>', HandsonRetrieveUpdateAPIView.as_view()),
    path('<int:pk>/members', NestedHandsonMemberListCreateView.as_view()),
    path('<int:handson>/members/<int:pk>', NestedHandsonMemberRetrieveDestroyView.as_view()),
    path('<int:pk>/contents', NestedHandsonContentListCreateView.as_view()),
    path('<int:handson>/contents/<int:pk>', NestedHandsonContentRetrieveUpdateDestroyView.as_view()),
    path('<int:handson>/contents/<int:pk>/completion', NestedHandsonContentPassMemberView.as_view()),
    path('<int:handson>/contents/<int:content>/completion/<int:pk>', NestedHandsonContentPassMemberRetrieveDestroyView.as_view()),
]
