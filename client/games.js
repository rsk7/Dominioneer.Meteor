var api = "http://dominioneer.elasticbeanstalk.com/games";
var fb = "http://graph.facebook.com/";

Template.games.events({
  "click #requestGames": function(event) {
    Meteor.http.get(api, function(err, res) {
      if (err) return new Meteor.Error("Dominioneer api call failed");
      Session.set("game", res.data);
    });
  },

  "click #requestPermissions": function(event) {
    Meteor.http.get(fb + Meteor.user().profile.userId + "/permissions", function(err, res) {
      if (err) return new Meteor.Error("Graph api failed");
      Session.set("permissions", res.data);
    });
  }
});

Template.games.helpers({
  cards: function() {
    var game = Session.get("game");
    if (game) return game.cards;
  },

  permissions: function() {
    if(Session.get("permissions")) return Session.get("permissions");
  }
});
