from django.contrib import admin
from .models import Board


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

admin.site.register(Board, BoardAdmin)