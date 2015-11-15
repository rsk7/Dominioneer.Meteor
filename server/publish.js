var getUserGameIds = function(userId) {
  var currentUserGames = Ratings.find({ userId: userId }).fetch();
  return currentUserGames.map(function(cug) {
    return cug.gameId;
  });
};

Meteor.publish("currentUserGames", function() {
  var gameIds = getUserGameIds(this.userId);

  if (gameIds) {
    return [
      Games.find({ _id: { "$in": gameIds }}),
      Ratings.find({ userId: this.userId })
    ];
  } else {
    this.ready();
  }
});
  