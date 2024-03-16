from django.db import models

DIFF_CHOIX = (
    ('Facile','facile'),
    ('Moyen','moyen'),
    ('Mamay','mamay'),

)

# Create your models here.
class Quiz(models.Model):
    nom = models.CharField(max_length=120)
    sujet = models.CharField(max_length=120)
    nombre_de_questions = models.IntegerField()
    temps = models.IntegerField(help_text="Durée d'un Quiz en minutes")
    score_de_reussite = models.IntegerField(help_text="Score de réussite en % ")
    difficulte = models.CharField(max_length=10,choices=DIFF_CHOIX)

    def __str__(self):
        return f"{self.nom}-{self.sujet}"
    
    def get_questions(self):
        return self.question_set.all()[:self.nombre_de_questions]

    class Meta:
        verbose_name_plural = 'Quizes'