import factory
from Todolist.models import Todo, Priority
from faker import Factory as FakerFactory

from pytest_factoryboy import register


faker = FakerFactory.create()

class PriorityFactory(factory.django.DjangoModelFactory):
      class Meta:
            model = Priority
      label = '高'


class TodoFactory(factory.django.DjangoModelFactory):
      class Meta:
            model = Todo

      task = 'just a test task'
      date_start = '1991-03-06'
      date_limit = '1992-03-07'
      priotity = factory.SubFactory(PriorityFactory)
      comment = 'just a test comment'

register(PriorityFactory)
register(TodoFactory)