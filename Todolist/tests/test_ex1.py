import pytest

from Todolist.models import Todo, Priority
# from Todolist.tests.factories import PriorityFactory, TodoFactory

def test_todo_factory(todo_factory, priority_factory):
      a = todo_factory
      b = priority_factory
      a.priotity = b
      assert a.priotity.label == "test"
      assert a.comment == "test"

@pytest.fixture
def create_todo():
      Priority.objects.create(label="高")
      priority_id = Priority.objects.get(label="高")
      todo = Todo.objects.create(
            task="test",
            date_start="2022-10-11",
            date_limit="2022-10-12",
            priority=priority_id,
            comment="just a test"     
      )
      return todo

@pytest.mark.django_db
def test_1(create_todo):
      create_todo
      assert Todo.objects.count() == 1

@pytest.mark.django_db
def test_2(create_todo):
      todo = create_todo
      assert todo.task == 'test'
      assert Todo.objects.count() == 1

