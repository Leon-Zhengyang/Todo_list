import pytest

from Todolist.models import Todo, Priority

@pytest.fixture
def create_todo():
      Priority.objects.create(label="高")
      priority_id = Priority.objects.get(label="高")
      Todo.objects.create(
            task="test",
            date_start="2022-10-11",
            date_limit="2022-10-12",
            priority=priority_id,
            comment="just a test"     
      )

@pytest.mark.django_db
def test_1(create_todo):
      create_todo()
      create_todo()
      assert Todo.objects.count() == 2

@pytest.mark.django_db
def test_2():
      Priority.objects.create(label="高")
      priority_id = Priority.objects.get(label="高")
      Todo.objects.create(
            task="test",
            date_start="2022-10-11",
            date_limit="2022-10-12",
            priority=priority_id,
            comment="just a test"
      )
      assert Todo.objects.count() == 1

