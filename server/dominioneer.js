var url = "http://dominioneer.elasticbeanstalk.com/";

var headers = function() {
  return {
    headers: {
      "Authorization": "Bearer " + Fb.accessToken()
    }
  };
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
    return HTTP.put(url + "games/" + gameId, options).data;
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

  // this does not work yet
  rateGame: function(gameId, rating) {
    var options = headers();
    options.headers["Content-type"] = "application/json";
    var requestUrl = url + "ratings/" + gameId + "/rating/" + rating;
    // console.log(requestUrl);
    // console.log(Fb.accessToken());
    return HTTP.put(requestUrl, options).data;
  }
});

