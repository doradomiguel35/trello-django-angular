from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from .models import Board
from rest_framework.authtoken.models import Token
from .serializers import BoardCreationSerializer, BoardSerializer


class BoardView(APIView):
	"""
	Board view
	"""
	# permission_classes = (permissions.IsAuthenticated,)

	permission_classes = (permissions.AllowAny,)

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



		
		



