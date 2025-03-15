from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.throttling import UserRateThrottle
from django.core.cache import cache
from django_filters.rest_framework import DjangoFilterBackend
from .models import MatchSummary, Player, BattingSummary, BowlingSummary
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.serializers import ModelSerializer
from .serializers import MatchSummarySerializer, PlayerSerializer, BattingSummarySerializer, BowlingSummarySerializer
import logging

logger = logging.getLogger(__name__)

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
    
    def create(self, validated_data):
        is_staff = validated_data.pop('is_staff', True)
        user = User.objects.create_user(**validated_data)
        user.is_staff = is_staff
        user.save()
        return user

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save()
        logger.info(f"User {serializer.data['username']} registered successfully.")

        
class MatchListView(ListAPIView):
    queryset = MatchSummary.objects.all().order_by('match_date')
    serializer_class = MatchSummarySerializer
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]
    filterset_fields = ['team1', 'team2', 'winner', 'match_date']
    filter_backends = [DjangoFilterBackend]

    def list(self, request, *args, **kwargs):
        page = request.query_params.get('page', 1)
        cache_key = f"all_matches_page_{page}"

        cached_data = cache.get(cache_key)
        if cached_data:
            logger.info(f"Retrieved matches page {page} from cache.")
            return Response(cached_data)

        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, timeout=300)
        logger.info(f"Retrieved matches page {page} from the database and cached it.")

        return response


class MatchDetailView(RetrieveAPIView):
    queryset = MatchSummary.objects.all()
    serializer_class = MatchSummarySerializer
    lookup_field = 'match_id'
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]


class PlayerListView(ListAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]
    filterset_fields = ['name', 'team', 'batting_style', 'bowling_style', 'playing_role']
    filter_backends = [DjangoFilterBackend]

    def list(self, request, *args, **kwargs):
        page = request.query_params.get('page', 1)
        cache_key = f"all_players_page_{page}"

        cached_data = cache.get(cache_key)
        if cached_data:
            logger.info(f"Retrieved players page {page} from cache.")
            return Response(cached_data)

        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, timeout=300)
        logger.info(f"Retrieved players page {page} from the database and cached it.")

        return response


class PlayerDetailView(RetrieveAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    lookup_field = 'name'
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]


class BattingSummaryView(ListAPIView):
    serializer_class = BattingSummarySerializer
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]
    filterset_fields = ['batsman_name', 'runs', 'balls', 'fours', 'sixes', 'strike_rate']
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        match_id = self.kwargs['match_id']
        return BattingSummary.objects.filter(match__match_id=match_id)

    def list(self, request, *args, **kwargs):
        page = request.query_params.get('page', 1)
        match_id = self.kwargs['match_id']
        cache_key = f"batting_summary_{match_id}_page_{page}"

        cached_data = cache.get(cache_key)
        if cached_data:
            logger.info(f"Retrieved batting summary for match {match_id} page {page} from cache.")
            return Response(cached_data)

        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, timeout=300)
        logger.info(f"Retrieved batting summary for match {match_id} page {page} from the database and cached it.")

        return response


class BowlingSummaryView(ListAPIView):
    serializer_class = BowlingSummarySerializer
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]
    filterset_fields = ['bowler_name', 'overs', 'maiden', 'runs_conceded', 'wickets', 'economy']
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        match_id = self.kwargs['match_id']
        return BowlingSummary.objects.filter(match__match_id=match_id)

    def list(self, request, *args, **kwargs):
        page = request.query_params.get('page', 1)
        match_id = self.kwargs['match_id']
        cache_key = f"bowling_summary_{match_id}_page_{page}"

        cached_data = cache.get(cache_key)
        if cached_data:
            logger.info(f"Retrieved bowling summary for match {match_id} page {page} from cache.")
            return Response(cached_data)

        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, timeout=300)
        logger.info(f"Retrieved bowling summary for match {match_id} page {page} from the database and cached it.")

        return response


from django.shortcuts import render

def api_overview(request):
    return render(request, 'api_urls.html')
