from django.contrib import admin
from .models import Handson, HandsonContent, ContentPassMember, HandsonMember

# Register your models here.

admin.site.register(Handson)
admin.site.register(HandsonContent)
admin.site.register(ContentPassMember)
admin.site.register(HandsonMember)