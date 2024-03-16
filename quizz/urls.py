from django.urls import path
from .views import QuizListView,quiz_view,quiz_data_view,quiz_view_redirect

app_name = 'quizz'

urlpatterns = [
    path('',QuizListView.as_view(),name='main-view'),
    path('<pk>/',quiz_view,name='quizz-view'),
    path('<pk>/data/',quiz_data_view,name='quizz-data-view'),

]