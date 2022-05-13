from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator
# Create your models here.

class Msg(models.Model):
    name = models.CharField(max_length=15, validators=[
    RegexValidator('^[A-Za-z]+$'),
        MinLengthValidator(2)
    ])
    msgText = models.CharField(max_length=30, validators=[
        MinLengthValidator(3)
    ])
    class Meta:
        ordering = ['-id']
