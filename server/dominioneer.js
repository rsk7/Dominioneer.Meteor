var url = "http://dominioneer.elasticbeanstalk.com/";

Meteor.methods({
  randGame: function() {
    return HTTP.get(url + "randGame").data;
  },

  game: function(userIds) {
    console.log(Fb.accessToken());
    return HTTP.get(url + "games", {
      params: {
        players: userIds.join(','),
        headers: {
          "Authorization": "Bearer " + Fb.accessToken()
        }
      }
    }).data;
  }
});

