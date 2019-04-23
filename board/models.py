from django.db import models
from users.models import User
from django_angular import settings

def ticket_file_upload_path(instance, filename):
    return f'tickets/{instance.user.id}/comments/{instance.ticket.id}/{filename}'

def ticket_image_file_upload_path(instance, filename):
    return f'ticket_images/{instance.user.id}/comments/{instance.ticket.id}/{filename}'

class Board(models.Model):
    """
    Boards is where the list's tickets are managed
    """
    VIS_P = 'Private'
    VIS_PU = 'Public'

    VISIBILITY_CHOICES = (
        (VIS_PU, 'Public'),
        (VIS_P, 'Private'),
    )

    title = models.CharField(max_length=100)
    description = models.CharField(max_length=300, default="")
    visibility = models.CharField(max_length=50, choices=VISIBILITY_CHOICES, default=VIS_PU)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="admin")
    member = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="members")

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)


class Ticket(models.Model):
    """
    Ticket model, the task
    """
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, default="", blank=True, null=True)
    assigned = models.ManyToManyField('users.User', blank=True)
    lists = models.ForeignKey('board.List', on_delete=models.SET_NULL, null=True)
    archived = models.BooleanField(default=False)
    deadline = models.DateField(null=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    """
    Comment model, comment on tickets 
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    comment = models.TextField()
    file = models.FileField(upload_to=ticket_file_upload_path, null=True)
    image = models.ImageField(upload_to=ticket_image_file_upload_path, null=True)
    ticket = models.ForeignKey('board.Ticket', on_delete=models.CASCADE)
    
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)


class List(models.Model):
    """
    List model
    """
    name = models.CharField(max_length=100)
    board = models.ForeignKey('board.Board', on_delete=models.CASCADE)
    archived = models.BooleanField(default=False)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)


class InviteToBoard(models.Model):
    """
    Invite to board
    """
    user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, related_name="invited")
    confirmed = models.BooleanField(default=False)
    board = models.ForeignKey('board.Board', on_delete=models.SET_NULL, null=True)
    invited_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, related_name="invited_by")

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)


class ActivityLog(models.Model):
    """
    Activity log
    """
    activity = models.CharField(max_length=250)
    board = models.ForeignKey('board.Board', on_delete=models.CASCADE)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)


class Progress(models.Model):
    """
    Progress
    """
    title = models.CharField(max_length=100)
    progress = models.IntegerField(default=0)
    ticket = models.ForeignKey('board.Ticket', on_delete=models.CASCADE)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)


class Checklist(models.Model):
    """
    Checklist for cards
    """
    name = models.CharField(max_length=100)
    progress = models.ForeignKey('board.Progress', on_delete=models.CASCADE)
    done = models.BooleanField(default=False)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)