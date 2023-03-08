import json
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.core import serializers

from Todolist.models import Priority, Todo
from . import util
from .validation import validate
from . import error_msg
from . import const

# 初期ラベル作成
def __create_priority():
    labels = ["高", "中", "低"]
    for label in labels:
        try:
            Priority.objects.get(label=label)
        except:
            Priority.objects.create(label=label)   

# 初期レンダリングする時
def index(request): 
    __create_priority()

    return render(request, "HTML/index.html")


@csrf_exempt
def regist(request):
    priority_dic = {"1":"高", "2":"中", "3":"低"}
    # get regist request params
    task = request.POST.get("task")
    priority_id = request.POST.get("priority")
    date_start = request.POST.get("date_start")
    date_end = request.POST.get("date_end")
    comment = request.POST.get("comment")

    # regist data validation
    result_start = validate.check_date_format(date_start)
    result_end = validate.check_date_format(date_end)
    result_task = validate.check_task_blank(task)
    if not result_task:
        todo_err = "error:" + error_msg.err_task
        return HttpResponse(todo_err, content_type="text/json-comment-filtered") 
    if not result_start or not result_end:
        todo_err = "error:" + error_msg.err_date_format
        return HttpResponse(todo_err, content_type="text/json-comment-filtered") 
    
    # create new todo list
    if result_start and result_end and result_task:
        priority = Priority.objects.get(label=priority_dic[priority_id])
        Todo.objects.create(
            task=task,
            date_start=date_start,
            date_limit=date_end,
            priority=priority,
            comment=comment
        )
        todo_all = Todo.objects.filter(deleted=0)
        todo_arr = []
        for todo in todo_all:
            todo_arr.append({
                "id": todo.id,
                "task":todo.task,
                "date_start": todo.date_start.strftime('%Y-%m-%d'),
                "date_limit": todo.date_limit.strftime('%Y-%m-%d'),
                "priority": todo.priority.label,
                "comment": todo.comment
            })
    return HttpResponse(json.dumps(todo_arr), status=200, content_type="application/json") 

@csrf_exempt
def edit(request):
    # get edit request params 
    pk = request.POST.get("todo_id")
    task = request.POST.get("task")
    priority_label = request.POST.get("priority")
    date_start = request.POST.get("date_start")
    date_limit = request.POST.get("date_end")
    comment = request.POST.get("comment")
    # get exist todo data and resave it
    todo = Todo.objects.get(pk=pk)
    priority = Priority.objects.get(label=priority_label)
    todo.task = task
    todo.date_start = date_start
    todo.date_limit = date_limit
    todo.priority = priority
    todo.comment = comment
    todo.save()

    # return new todo list again
    todo_all = Todo.objects.filter(deleted=0)
    todo_arr = []
    for todo in todo_all:
        todo_arr.append({
            "id": todo.id,
            "task":todo.task,
            "date_start": todo.date_start.strftime('%Y-%m-%d'),
            "date_limit": todo.date_limit.strftime('%Y-%m-%d'),
            "priority": todo.priority.label,
            "comment": todo.comment
        })
    
    return HttpResponse(json.dumps(todo_arr), status=200, content_type="application/json")   


@csrf_exempt
def search(request):
    # get search params
    task_search = request.POST.get("task_search")
    priority_search = request.POST.get("priority_search")
    date_start_search = request.POST.get("date_start_search")
    date_end_search = request.POST.get("date_end_search")
    comment_search = request.POST.get("comment_search")

    # filter todo list by above conditions
    q_task = Q(task__icontains=task_search) if task_search else Q()
    q_comment = Q(comment__icontains=comment_search) if comment_search else Q()
    q_date_start = Q(date_start__gte=date_start_search) if date_start_search else Q()
    q_date_limit = Q(date_limit__lte=date_end_search) if date_end_search else Q()
    q_priority = Q(priority_id=priority_search) if priority_search else Q()
    todo_list = Todo.objects.filter(
        q_task & q_comment & q_date_start & q_date_limit & q_priority &
        Q(deleted=0)
    )
    todo_arr = []
    for todo in todo_list:
        todo_arr.append({
            "id": todo.id,
            "task":todo.task,
            "date_start": todo.date_start.strftime('%Y-%m-%d'),
            "date_limit": todo.date_limit.strftime('%Y-%m-%d'),
            "priority": todo.priority.label,
            "comment": todo.comment
        })

    return HttpResponse(json.dumps(todo_arr), status=200, content_type="application/json")   


@csrf_exempt
def init_list(request):
    # return all todo lists for first time 
    todo_lists = Todo.objects.filter(deleted=0)
    todo_arr = []
    for todo in todo_lists:
        todo_arr.append({
            "id": todo.id,
            "task":todo.task,
            "date_start": todo.date_start.strftime('%Y-%m-%d'),
            "date_limit": todo.date_limit.strftime('%Y-%m-%d'),
            "priority": todo.priority.label,
            "comment": todo.comment
        })
    return HttpResponse(json.dumps(todo_arr), status=200, content_type="application/json") 


# delete
@csrf_exempt
def delete(request):
    pk = request.POST.get("task_pk")
    todo = Todo.objects.get(pk=pk)
    todo.deleted = 1
    todo.save()
    return HttpResponse(todo.id)