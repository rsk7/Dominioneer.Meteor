var gameHistory = new Mongo.Collection(null);

Template.history.onRendered(function() {
  Session.set("loadingHistory", true);
  Meteor.call("getHistory", function(err, response) {
    if (err) {
      console.log(err);
    } else {
      response.forEach(function(history) {
        gameHistory.upsert(history, history, {upsert: true});
      });
    }
    Session.set("loadingHistory", false);
  });
});

Template.history.helpers({
  loading: function() {
    return Session.get("loadingHistory");
  },

  gameHistory: function() {
    return gameHistory.find({});
  }
});
