import factory
from Todolist.models import Todo, Priority

# class TodoFactory(factory.django.DjangoMOdelFactory):

class TodoFactory(factory.django.DjangoModelFactory):
      
    class Meta:
        model = Todo
        django_get_or_create = ('task',)

    task = 'just a test'