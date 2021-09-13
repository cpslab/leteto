from django.shortcuts import get_object_or_404
from rest_framework import generics

class MultipleFieldLookupMixin(object):
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """
    def get_object(self):
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]:
                filter[field] = self.kwargs[field]
        obj = get_object_or_404(queryset, **filter)
        self.check_object_permissions(self.request, obj)
        return obj

class BaseListCreateAPIView(MultipleFieldLookupMixin, generics.ListCreateAPIView):
    pass

class BaseRetrieveAPIView(MultipleFieldLookupMixin, generics.RetrieveAPIView):
    pass

class BaseRetrieveDestroyAPIView(MultipleFieldLookupMixin, generics.RetrieveDestroyAPIView):
    pass

class BaseRetrieveUpdateDestroyAPIView(MultipleFieldLookupMixin, generics.RetrieveUpdateDestroyAPIView):
    pass