from django.urls import path
from .views import (
    MatchListView,
    MatchDetailView,
    PlayerDetailView,
    BattingSummaryView,
    BowlingSummaryView,
    PlayerListView,
)

urlpatterns = [
    path("matches/", MatchListView.as_view(), name="match-list"),  
    path("matches/<str:match_id>/", MatchDetailView.as_view(), name="match-detail"), 
    path("players/", PlayerListView.as_view(), name="player-list"),
    path("players/<str:name>/", PlayerDetailView.as_view(), name="player-detail"),  
    path("matches/<str:match_id>/batting/", BattingSummaryView.as_view(), name="batting-summary"),
    path("matches/<str:match_id>/bowling/", BowlingSummaryView.as_view(), name="bowling-summary"),
]
