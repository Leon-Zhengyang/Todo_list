import factory
from Todolist.models import Todo, Priority

class PriorityFactory(factory.django.DjangoModelFactory):
      class Meta:
            model = Priority

      label = '高'


class TodoFactory(factory.django.DjangoModelFactory):
      class Meta:
            model = Todo

      task = factory.Sequence(lambda n: u'タスク %d' % n)
      date_start = '1900-01-01'
      date_limit = '2025-12-31'
      priority = factory.SubFactory(PriorityFactory)
      comment = factory.Sequence(lambda n: u'コメント %d' % n)
