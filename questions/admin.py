from django.contrib import admin
from .models import Question,Reponse


# Register your models here.

class ReponseInline(admin.TabularInline):
    model = Reponse

class QuestionAdmin(admin.ModelAdmin):
    inlines = [ReponseInline]

admin.site.register(Question,QuestionAdmin)
admin.site.register(Reponse)