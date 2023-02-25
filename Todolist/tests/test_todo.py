import pytest

from Todolist.models import Todo, Priority
from rest_framework.test import APIClient
import pytest

client = APIClient()
@pytest.mark.django_db
def test_url(priority_todo_factory):
      priority_todo_factory
      response = client.post('/init_list/', {'title': 'new ide1a'}, format='json')
#     assert response.status_code == 200
      assert response.json() == 1

@pytest.fixture
def priority_todo_factory(db, todo_factory, priority_factory):

      high = priority_factory.create(label='高')
      middle = priority_factory.create(label='中')
      low = priority_factory.create(label='低')
      todo_factory.create(priority=high, task="todo1")
      todo_factory.create(priority=middle, task="todo2")
      todo_factory.create(priority=low, task="todo3")


@pytest.mark.django_db
def test_count(priority_todo_factory):
      priority_todo_factory
      count_pri = Priority.objects.all().count()
      count_todo = Todo.objects.all().count()
      assert count_pri == 3
      assert count_todo == 3

@pytest.mark.django_db
def test_todo_task(priority_todo_factory):
      priority_todo_factory
      todos = Todo.objects.all()
      task = []
      for todo in todos:
            task.append(todo.task)
      assert "todo1" in task
      assert "todo2" in task
      assert "todo3" in task

@pytest.mark.django_db
def test_todo_create(db, todo_factory, priority_factory):
      high = priority_factory.create(label='高')
      todo = todo_factory.create(
            task="just a test",
            date_start='2023-01-30',
            date_limit='2023-02-12',
            priority=high,
            comment="just a comment"
      )
      assert todo.task == "just a test"
      assert todo.date_start == '2023-01-30'
      assert todo.date_limit == '2023-02-12'
      assert todo.priority.label == "高"
      assert todo.comment == "just a comment"

@pytest.mark.django_db
def test_todo_read(db, todo_factory, priority_factory):
      high = priority_factory.create(label='高')
      todo = todo_factory.create(
            task="just a test",
            date_start='2023-01-30',
            date_limit='2023-02-12',
            priority=high,
            comment="just a comment"
      )
      todo_test1 = Todo.objects.get(pk=todo.id)
      todo_test2 = Todo.objects.get(comment="just a comment")
      assert todo_test1.task == "just a test"
      assert todo_test2.comment == "just a comment"

@pytest.mark.django_db
def test_todo_update(db, todo_factory, priority_factory):
      high = priority_factory.create(label='高')
      todo = todo_factory.create(
            task="just a test",
            date_start='2023-01-30',
            date_limit='2023-02-12',
            priority=high,
            comment="just a comment"
      )
      todo = Todo.objects.get(pk=todo.id)
      assert todo.task == "just a test"
      todo.task = "just a test after"
      assert todo.task == "just a test after"

@pytest.mark.django_db
def test_todo_delete(db, todo_factory, priority_factory):
      high = priority_factory.create(label='高')
      todo = todo_factory.create(
            task="just a test",
            date_start='2023-01-30',
            date_limit='2023-02-12',
            priority=high,
            comment="just a comment"
      )
      count_before = Todo.objects.all().count()
      assert count_before == 1
      Todo.objects.get(pk=todo.id).delete()
      count_after = Todo.objects.all().count()
      assert count_after == 0
