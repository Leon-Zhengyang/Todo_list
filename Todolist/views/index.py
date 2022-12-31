from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from Todolist.models import Priority, Todo
from . import util

def index(request):
    todo = Todo.objects.all()

    return render(request, "HTML/index.html")

@csrf_exempt
def regist(request):
    task = request.POST.get("task")
    priority_id = request.POST.get("priority")
    date_start = request.POST.get("date_start")
    date_end = request.POST.get("date_end")
    comment = request.POST.get("comment")
    priority = Priority.objects.get(pk=priority_id)
    # Todo.objects.create(
    #     task=task,
    #     date_start=date_start,
    #     date_limit=date_end,
    #     priority=priority,
    #     comment=comment
    # )
    todo_all = Todo.objects.filter(deleted=0)
    todo_arr = []
    for todo in todo_all:
        todo_str = ""
        todo_str += "id:" + str(todo.id) + ","
        todo_str += "task:" + todo.task + ","
        todo_str += "date_start:" + todo.date_start.strftime('%Y-%m-%d') + ","
        todo_str += "date_limit:" + todo.date_limit.strftime('%Y-%m-%d') + ","
        todo_str += "priority:" + todo.priority.label + ","
        todo_str += "comment:" + todo.comment + ","
        todo_str += "status:" + str(todo.status) + ","
        todo_str += "deleted:" + str(todo.deleted)
        todo_arr.append(todo_str + "//")
    return HttpResponse(todo_arr)

@csrf_exempt
def search(request):
    task_search = request.POST.get("task_search")
    todo_list = Todo.objects.filter(task__icontains=task_search, deleted=0)
    todo_res = util.return_todo(todo_list)
    return HttpResponse(todo_res)

# delete
@csrf_exempt
def delete(request):
    pk = request.POST.get("task_pk")
    todo = Todo.objects.get(pk=pk)
    todo.deleted = 1
    todo.save()
    return HttpResponse(todo.id)

def ppap():
    return "ppap"
