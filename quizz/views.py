from django.shortcuts import render
from .models import Quiz
from django.views.generic import ListView
from django.http import JsonResponse

# Create your views here.

class QuizListView(ListView):
    model = Quiz
    template_name = 'quizz/main.html'


def quiz_view(request,pk):
    quiz = Quiz.objects.get(pk=pk)
    return render(request,'quizz/quiz.html',{'quiz':quiz})

def quiz_data_view(request,pk):
    quiz = Quiz.objects.get(pk=pk)
    questions = []
    for q in quiz.get_questions():
        reponses = []
        for r in q.get_reponses():
            reponses.append({'texte':r.texte,'estCorrect':r.correct})
        questions.append({q.texte: reponses})
    return  JsonResponse({
        'questions':questions,
        'temps':quiz.temps,
        'score_ideal':quiz.score_de_reussite,
    })   
