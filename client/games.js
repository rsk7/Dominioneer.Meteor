var api = "http://dominioneer.elasticbeanstalk.com/games";

Template.games.events({
    "click #requestGames": function(event) {
        Meteor.http.get(api, function(err, res) {
            if (err) return new Meteor.Error("Dominioneed api call failed");
            Session.set("game", res.data);
        });
    }
});

Template.games.helpers({
    cards: function() {
        var game = Session.get("game");
        if (game) return game.cards;
    }
});
