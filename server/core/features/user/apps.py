from django.apps import AppConfig


class UserConfig(AppConfig):
    # default_auto_field = 'django.db.models.BigAutoField'
    name = 'features.user'
    label = 'features_user'

    def ready(self):
        import features.user.signals.handlers
