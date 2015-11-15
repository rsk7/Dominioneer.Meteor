Template.unrated.helpers({
  unratedGames: function() {
    // only get games with no ratings
    var ratings = Ratings.find({ rating: { "$exists": false }});

    var ratedGameIds = ratings.map(function(r) {
      return r.gameId;
    });

    return Games.find({ _id : { "$in" : ratedGameIds }});
  }
});



