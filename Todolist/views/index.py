from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q

from Todolist.models import Priority, Todo
from . import util
from .validation import validate
from . import error_msg
from . import const


def index(request):
    if not Priority.objects.all():
        Priority.objects.create(label="高")
        Priority.objects.create(label="中")
        Priority.objects.create(label="低")
    return render(request, "HTML/index.html")


@csrf_exempt
def regist(request):
    task = request.POST.get("task")
    priority_id = request.POST.get("priority")
    date_start = request.POST.get("date_start")
    date_end = request.POST.get("date_end")
    comment = request.POST.get("comment")
    result_start = validate.check_date_format(date_start)
    result_end = validate.check_date_format(date_end)
    result_task = validate.check_task_blank(task)
    if not result_task:
        todo_all = Todo.objects.filter(deleted=0)
        todo_res = util.return_todo(todo_all)
        todo_res += "error:" + error_msg.err_task
        return HttpResponse(todo_res)
    if not result_start or not result_end:
        todo_all = Todo.objects.filter(deleted=0)
        todo_res = util.return_todo(todo_all)
        todo_res += "error:" + error_msg.err_date_format
        return HttpResponse(todo_res) 
    if result_start and result_end and result_task:
        priority = Priority.objects.get(pk=priority_id)
        Todo.objects.create(
            task=task,
            date_start=date_start,
            date_limit=date_end,
            priority=priority,
            comment=comment
        )
        todo_all = Todo.objects.filter(deleted=0)
        todo_res = util.return_todo(todo_all)
    return HttpResponse(todo_res) 

@csrf_exempt
def edit(request):
    pk = request.POST.get("todo_id")
    task = request.POST.get("task")
    priority_id = request.POST.get("priority")
    date_start = request.POST.get("date_start")
    date_limit = request.POST.get("date_end")
    comment = request.POST.get("comment")
    todo = Todo.objects.get(pk=pk)
    priority = Priority.objects.get(pk=priority_id)
    todo.task = task
    todo.date_start = date_start + const.time_diff
    todo.date_limit = date_limit + const.time_diff
    todo.priority = priority
    todo.comment = comment
    todo.save()
    todo_all = Todo.objects.filter(deleted=0)
    todo_res = util.return_todo(todo_all)
    return HttpResponse(todo_res)   


@csrf_exempt
def search(request):
    task_search = request.POST.get("task_search")
    priority_search = request.POST.get("priority_search")

    date_start_search = request.POST.get("date_start_search")
    date_end_search = request.POST.get("date_end_search")
    comment_search = request.POST.get("comment_search")
    q_task = Q(task__icontains=task_search) if task_search else Q()
    q_comment = Q(comment__icontains=comment_search) if comment_search else Q()
    q_date_start = Q(date_start__gte=date_start_search) if date_start_search else Q()
    q_date_limit = Q(date_limit__lte=date_end_search) if date_end_search else Q()
    q_priority = Q(priority_id=priority_search) if priority_search else Q()
    todo_list = Todo.objects.filter(
        q_task & q_comment & q_date_start & q_date_limit & q_priority &
        Q(deleted=0)
    )
    todo_res = util.return_todo(todo_list)
    return HttpResponse(todo_res)


@csrf_exempt
def init_list(request):
    todo_list = Todo.objects.filter(deleted=0)
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