from django.db import models


# Create your models here.

class CustomUser(models.Model):
    username = models.CharField(max_length=30)
    subscribe_newsletters = models.BooleanField(default=True)
    old_id = models.IntegerField(null=True, blank=True)
    old_source = models.CharField(max_length=25, null=True, blank=True)

    class Meta:
        db_table = 'pfoc'
        app_label = 'frcstats'