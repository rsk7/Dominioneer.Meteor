Template.playGame.events({
  "click #playGame": function(e, template) {
    e.target.innerHTML = "Registering game as played..."
    Meteor.call("playGame", 
      template.data.userIds, 
      template.data.game.id, 
      function(err, response) {
        if (err) {
          console.log(err);
        } else {
          console.log(response);
          // game registered
          Router.go("/");
        }
        e.target.innerHTML = "Play game";
      }
    );
  }
});
