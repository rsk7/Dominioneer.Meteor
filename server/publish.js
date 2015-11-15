Meteor.publish("currentUserGames", function() {
  var currentUserGames = Ratings.find({ userId: this.userId }).fetch();

  var gameIds = currentUserGames.map(function(cug) {
    return cug.gameId;
  });

  if (gameIds) {
    return [
      Games.find({ _id: { "$in": gameIds }}),
      Ratings.find({ userId: this.userId })
    ];
  } else {
    this.ready();
  }
});
