from django.contrib import admin
from .models import Board, List, Ticket


class BoardAdmin(admin.ModelAdmin):
	"""
	board admin
	"""
	class Meta:
		model = Board
		list_display = (
			'id',
			'title',
			'description',
		)


class ListAdmin(admin.ModelAdmin):
	"""
	list admin
	"""
	class Meta:
		model = List
		list_display = (
			'id',
			'name',
			'archived'
		)


class TicketAdmin(admin.ModelAdmin):
	"""
	ticket admin
	"""
	class Meta:
		model = Ticket
		list_display = (
			'id',
			'name',
			'description',
			'archived',
		)
admin.site.register(Ticket, TicketAdmin)
admin.site.register(List, ListAdmin)
admin.site.register(Board, BoardAdmin)