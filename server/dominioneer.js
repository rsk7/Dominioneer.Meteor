var url = "http://dominioneer.elasticbeanstalk.com/";

Meteor.methods({
  randGame: function() {
    return HTTP.get(url + "randGame").data;
  },

  game: function(userIds) {
    return HTTP.get(url + "games", {
      params: {
        players: userIds.join(',')
      }
    }).data;
  }
});

