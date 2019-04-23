from rest_framework import serializers
from .models import Board


class BoardCreationSerializer(serializers.ModelSerializer):
	"""
	Board serializer
	"""
	description = serializers.CharField(max_length=200, required=False)

	class Meta:
		model = Board
		fields = (
			'title',
			'description',
			'visibility')


class BoardSerializer(serializers.ModelSerializer):
	"""
	Board serializer detailed
	"""

	class Meta:
		model = Board
		fields = (
			'id',
			'title',
			'description',
			'visibility',
			'owner_id',
			'member'
		)