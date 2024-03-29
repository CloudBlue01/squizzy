# Generated by Django 3.2.12 on 2024-03-14 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=120)),
                ('sujet', models.CharField(max_length=120)),
                ('nombres_de_questions', models.IntegerField()),
                ('temps', models.IntegerField(help_text="Durée d'un Quiz en minutes")),
                ('score_de_reussite', models.IntegerField(help_text='Score de réussite en % ')),
                ('difficulte', models.CharField(choices=[('Facile', 'facile'), ('Moyen', 'moyen'), ('Mamay', 'mamay')], max_length=10)),
            ],
        ),
    ]
