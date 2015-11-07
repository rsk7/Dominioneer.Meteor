var generateRandomGame = function() {
  Dominioneer.randGame(function(data) {
    Session.set("game", data);
  });
};

Template.randGame.onRendered(function() {
  if(!Session.get("game")) {
    generateRandomGame();
  }
});

Template.randGame.events({
  "click #regenerate": function() {
    generateRandomGame();
  }
});

Template.randGame.helpers({
  cards: function() {
    var game = Session.get("game");
    if (game) return game.cards;
  }
});

