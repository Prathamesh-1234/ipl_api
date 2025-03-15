# Generated by Django 5.1.7 on 2025-03-14 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api01', '0002_alter_battingsummary_strike_rate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bowlingsummary',
            name='dot_balls',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='bowlingsummary',
            name='economy',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
