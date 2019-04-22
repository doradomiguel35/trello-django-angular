from rest_framework import serializers

from .models import User
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
	"""
	login serializer returns user instance
	"""

	user = None

	email = serializers.CharField(write_only=True)
	password = serializers.CharField(write_only=True)

	def validate(self, data):
		email, password = data.values()

		if not email or not password:
			msg = 'Must include a email and password'
			raise serializers.ValidationError(msg, code='authorization')

		self.user = authenticate(
			email = email,
			password = password 
		)

		if self.user is None:
			msg = 'Incorrect email or password'
			raise serializers.ValidationError(msg, code='authorization')

		return data


class RegisterSerializer(serializers.Serializer):
	"""
	serializer for creating a new user
	"""
	user = None

	email = serializers.EmailField(write_only=True)
	first_name = serializers.CharField(write_only=True)
	last_name = serializers.CharField(write_only=True)
	password = serializers.CharField(write_only=True)
	password2 = serializers.CharField(write_only=True)

	def validate(self, data):
		email, first_name, last_name, password, password2 = data.values()

		if password != password2:
			msg = 'Passwords do not match'
			raise serializers.ValidationError(msg, code='authorization')

		self.user = User.objects.filter(email=email).first()

		if self.user:
			msg = 'Email already exists'
			raise serializers.ValidationError(msg, code='authorization')

		return data













