# features/user/signals/handlers.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.contrib.auth.models import Group


# only works by register through API
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_profile(sender, instance, created, **kwargs):

    if created:
        g1 = Group.objects.get(name='Common Permission')
        instance.groups.add(g1)
