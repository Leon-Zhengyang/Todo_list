from django.urls import path

from .views import index

urlpatterns = [
    path("", index.index, name="index"),
    path("todo_regist/", index.regist, name="regist"),
    path("todo_search/", index.search, name="search")
]