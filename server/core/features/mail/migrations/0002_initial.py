# Generated by Django 3.2.12 on 2022-04-07 19:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('features_mail', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='emails', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='email',
            name='recipients',
            field=models.ManyToManyField(related_name='emails_received', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='email',
            name='sender',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='emails_sent', to=settings.AUTH_USER_MODEL),
        ),
    ]
