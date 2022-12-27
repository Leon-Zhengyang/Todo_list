from django.db import models

# priority table
class Priority(models.Model):
    id = models.AutoField(primary_key=True)
    label = models.CharField("ラベル", max_length=50)