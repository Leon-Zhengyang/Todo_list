from http.client import HTTPResponse
from django.shortcuts import render
from django.http import HttpResponse

from Todolist.models import Priority, Todo

def index(request):
    todo = Todo.objects.all()
    print(todo)
    for i in todo:
        print(i.task,i.date_start,i.priority)
    return render(request, "HTML/index.html")

def regist(request):
    task = request.POST.get("task")
    priority_id = request.POST.get("priority")
    date_start = request.POST.get("date_start")
    date_end = request.POST.get("date_end")
    comment = request.POST.get("comment")
    priority = Priority.objects.get(pk=priority_id)
    Todo.objects.create(
        task=task,
        date_start=date_start,
        date_limit=date_end,
        priority=priority,
        comment=comment
    )
    return HttpResponse(1)