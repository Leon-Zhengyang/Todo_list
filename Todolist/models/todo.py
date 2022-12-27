from django.db import models

# todo table
class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.CharField("タスク", max_length=50)
    date_start = models.DateTimeField(null=True)
    date_limit = models.DateTimeField(null=True)
    priority = models.ForeignKey("Priority", on_delete=models.CASCADE, related_name="todos")
    comment = models.TextField(
        "コメント内容",
        blank=True,
        null=True,
        max_length=255,
    )
    status = models.IntegerField(
        choices=(
            (0, "ACTIVE"),
            (1, "INACTIVE"),
        ),
        default=0,
    )
    deleted = models.IntegerField(
        choices=(
            (0, "ACTIVE"),
            (1, "INACTIVE"),
        ),
        default=0,
    )