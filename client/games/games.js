Template.games.events({
  "click #requestGames": function(event) {
    Dominioneer.randGame(function(data) {
      Session.set("game", data);
    });
  },

  "click #requestPermissions": function(event) {
    Facebook.permissions(Meteor.user().profile.userId, function(data) {
      Session.set("permissions", data);
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
