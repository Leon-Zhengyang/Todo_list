from pytest_factoryboy import register
from .factories import PriorityFactory, TodoFactory

register(PriorityFactory)
register(TodoFactory)