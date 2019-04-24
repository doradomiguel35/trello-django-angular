from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication

from .models import Board, List
from rest_framework.authtoken.models import Token
from .serializers import BoardCreationSerializer, BoardSerializer


class BoardView(APIView):
	"""
	Board view
	"""
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (TokenAuthentication,) 

	def get(self, *args, **kwargs):
		board = Board.objects.filter(owner_id=kwargs.get('id')).values()
		serializer = list(board)

		return Response(serializer, status=200)

	def post(self, request, *args, **kwargs):
		serializer = BoardCreationSerializer(
			data=request.data)

		user = Token.objects.get(key=request.data['token']).user

		serializer.is_valid(raise_exception=True)
		
		board = Board(
			title=request.data['title'],
			description=request.data['description'],
			visibility=request.data['visibility'],
			owner_id=user.id,
		)
		board.save()
		board.member.add(user)
		board.save()

		board_serialize = BoardSerializer(board).data

		return Response(board_serialize, status=200)


class ListView(APIView):
	"""
	Lists view
	"""
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (TokenAuthentication,) 

	def get(self, *args, **kwargs):
		lists = List.objects.filter(board_id=kwargs.get('board_id')).values()

		serialize = list(lists)

		return Response(serialize, status=200)


class BoardDetailView(APIView):
	"""
	Board detail view
	"""
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (TokenAuthentication,) 

	def get(self, *args, **kwargs):
		board = Board.objects.get(id=kwargs.get('board_id'))
		serialize = BoardSerializer(board).data

		return Response(serialize, status=200)
		
		



