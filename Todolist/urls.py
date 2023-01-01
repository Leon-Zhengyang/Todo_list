from django.urls import path

from .views import index

urlpatterns = [
    path("", index.index, name="index"),
    path("todo_regist/", index.regist, name="regist"),
    path("todo_edit/", index.edit, name="edit"),
    path("todo_search/", index.search, name="search"),
    path("todo_delete/", index.delete, name="delete"),
    path("init_list/", index.init_list, name="init_list"),
]