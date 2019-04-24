from django.urls import path, include
from . import views
from rest_framework import routers

urlpatterns = [
	path('create/', views.BoardView.as_view()),
	path('view/<int:id>/', views.BoardView.as_view()),
	path('view/main/<int:board_id>/', views.BoardDetailView.as_view()),
	path('lists/<int:board_id>/', views.ListView.as_view()),
]