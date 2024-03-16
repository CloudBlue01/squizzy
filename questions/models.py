from django.db import models
from quizz.models import Quiz
# Create your models here.

class Question(models.Model):
    texte = models.CharField(max_length=200)
    quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE)
    cree_le = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.texte)
    
    def get_reponses(self):
        return self.reponse_set.all()


class Reponse(models.Model): 
    texte = models.CharField(max_length=200)
    correct = models.BooleanField(default=False)
    #question = models.ForeignKey(Question,on_delete=models.CASCADE,related_name='reponses')
    question = models.ForeignKey(Question,on_delete=models.CASCADE,)
    cree_le = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Question :{self.question.texte}, Réponse : {self.texte}, Correct : {self.correct}"