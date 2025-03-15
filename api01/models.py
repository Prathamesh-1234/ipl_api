from django.db import models

class MatchSummary(models.Model):
    match_id = models.CharField(max_length=10, primary_key=True) 
    team1 = models.CharField(max_length=100)  
    team2 = models.CharField(max_length=100)  
    winner = models.CharField(max_length=100, null=True, blank=True)  
    margin = models.CharField(max_length=50, null=True, blank=True)  
    match_date = models.DateField() 

    def __str__(self):
        return f"Match {self.match_id}: {self.team1} vs {self.team2}"


class Player(models.Model):
    name = models.CharField(max_length=100, primary_key=True) 
    team = models.CharField(max_length=100) 
    batting_style = models.CharField(max_length=50) 
    bowling_style = models.CharField(max_length=50) 
    playing_role = models.CharField(max_length=50) 

    def __str__(self):
        return f"{self.name} ({self.team})"


class BattingSummary(models.Model):
    match = models.ForeignKey(MatchSummary, on_delete=models.CASCADE, related_name="batting_summaries")  
    batsman_name = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="batting_records") 
    team_innings = models.CharField(max_length=100) 
    batting_pos = models.IntegerField() 
    out_or_not_out = models.CharField(max_length=10) 
    runs = models.IntegerField()  
    balls = models.IntegerField() 
    fours = models.IntegerField()  
    sixes = models.IntegerField() 
    strike_rate = models.FloatField(null=True, blank=True) 

    def __str__(self):
        return f"{self.batsman_name} - {self.runs} runs in Match {self.match.match_id}"



class BowlingSummary(models.Model):
    match = models.ForeignKey(MatchSummary, on_delete=models.CASCADE, related_name="bowling_summaries") 
    bowler_name = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="bowling_records") 
    bowling_team = models.CharField(max_length=100)  
    overs = models.FloatField()  
    maiden = models.IntegerField() 
    runs_conceded = models.IntegerField() 
    wickets = models.IntegerField()
    economy = models.FloatField(null=True, blank=True)  
    dot_balls = models.IntegerField(null=True, blank=True) 
    fours_conceded = models.IntegerField()  
    sixes_conceded = models.IntegerField()  
    wides = models.IntegerField() 
    no_balls = models.IntegerField() 
    def __str__(self):
        return f"{self.bowler_name} - {self.wickets} wickets in Match {self.match.match_id}"