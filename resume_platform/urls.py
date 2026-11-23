from django.contrib import admin
from django.urls import path
from builder.views import resume_builder

urlpatterns = [path("admin/", admin.site.urls), path("", resume_builder, name="builder")]
