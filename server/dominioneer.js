var url = "http://dominioneer.elasticbeanstalk.com/";

var headers = function() {
  return {
    headers: {
      "Authorization": "Bearer " + Fb.accessToken(),
      "Content-type": "application/json"
    }
  };
};

var store = function(gameId) {
  var game = HTTP.get(url + "games/" + gameId, headers()).data;
  game._id = game.id;
  delete game.id;
  Games.insert(game);
  Ratings.insert({ userId: Meteor.userId(), gameId: game._id });
};

var rate = function(gameId, ratingValue) {
  var userRating = { gameId: gameId, userId: Meteor.userId() };
  Ratings.update(userRating, { "$set" : { rating: ratingValue }});
};

Meteor.methods({
  randGame: function() {
    return HTTP.get(url + "randGame").data;
  },

  game: function(userIds) {
    var options = _.extend({
      params: {
        players: userIds.join(",")
      }
    }, headers());

    return HTTP.get(url + "games", options).data;
  },

  playGame: function(userIds, gameId) {
    var options = _.extend({
      data: {
        players: userIds.join(",")
      }
    }, headers());

    var gameId = HTTP.put(url + "games/" + gameId, options).data.id;
    store(gameId);
    return gameId;
  },

  getHistory: function() {
    var ratings = HTTP.get(url + "ratings", headers()).data;
    return ratings;
  },

  getUnratedGames: function() {
    var allRatings = HTTP.get(url + "ratings", headers()).data;
    return allRatings.filter(function(r) {
      return !r.ratings;
    });
  },

  rateGame: function(gameId, rating) {
    var requestUrl = url + "ratings/" + gameId + "/rating/" + rating;
    var submittedRating = HTTP.put(requestUrl, headers()).data.rating;
    rate(gameId, submittedRating);
  }
});

