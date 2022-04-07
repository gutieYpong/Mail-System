from django.db import models


class Email(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)
    sender = models.ForeignKey(
        "features_user.User",
        null=True,
        on_delete=models.SET_NULL,
        related_name="emails_sent"
        )
    recipients = models.ManyToManyField("features_user.User", related_name="emails_received")
    subject = models.CharField(max_length=255)
    body = models.TextField(blank=True)

    class Meta:
        ordering = ['created']

    # def serialize(self):
    #     return {
    #         "id": self.id,
    #         "user": self.user.email,
    #         "sender": self.sender.email,
    #         "recipients": [user.email for user in self.recipients.all()],
    #         "subject": self.subject,
    #         "body": self.body,
    #         "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p"),
    #         "read": self.read,
    #         "archived": self.archived
    #     }

    # def __str__(self):
    #     return f"Subject: {self.subject}; Sent by: {self.sender}; Owned by: {self.user}."
