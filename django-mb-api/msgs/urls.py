from django.urls import path
from .views import MsgAPIController

urlpatterns = [
    path('messages', MsgAPIController.as_view()),
]