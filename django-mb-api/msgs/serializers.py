from rest_framework import serializers
from .models import Msg
class MsgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Msg
        fields = ( 'id', 'name', 'msgText',)