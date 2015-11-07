Template.createGame.onRendered(function() {
  Meteor.call("getFriends", function(err, response) {
    if (err) console.log(err);
    else Session.set("friends", response);
  });
});

Template.createGame.helpers({
  friends: function() {
    return Session.get("friends");
  }
});
