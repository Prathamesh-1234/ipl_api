from rest_framework import serializers
from .models import MatchSummary, Player, BattingSummary, BowlingSummary


class MatchSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchSummary
        fields = "__all__"


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = "__all__"


class BattingSummarySerializer(serializers.ModelSerializer):
    batsman_name = serializers.StringRelatedField()

    class Meta:
        model = BattingSummary
        fields = "__all__"


class BowlingSummarySerializer(serializers.ModelSerializer):
    bowler_name = serializers.StringRelatedField()

    class Meta:
        model = BowlingSummary
        fields = "__all__"


class MatchDetailSerializer(serializers.ModelSerializer):
    batting_summaries = BattingSummarySerializer(many=True, read_only=True)
    bowling_summaries = BowlingSummarySerializer(many=True, read_only=True)

    class Meta:
        model = MatchSummary
        fields = "__all__"
