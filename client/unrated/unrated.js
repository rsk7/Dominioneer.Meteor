var games = new Mongo.Collection(null);

Template.unrated.onRendered(function() {
  Session.set("loadingUnratedGames", true);
  Meteor.call("getUnratedGames", function(err, response) {
    if (err) {
      console.log(err);
    } else {
      response.forEach(function(unratedGame) {
        games.upsert(unratedGame, unratedGame, {upsert: true});
      });
    }
    Session.set("loadingUnratedGames", false);
  });
});

Template.unrated.helpers({
  loading: function() {
    return Session.get("loadingUnratedGames");
  },

  unratedGames: function() {
    // only get games with no ratings
    return games.find({ ratings: {"$exists" : false}});
  }
});

Template.unratedGame.created = function() {
  this.showRatingForm = new ReactiveVar(false);
  this.updatingRating = new ReactiveVar(false);
};

Template.unratedGame.helpers({
  showRatingForm: function() {
    return Template.instance().showRatingForm.get();
  },

  ratingValues: function() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  },

  updatingRating: function() {
    return Template.instance().updatingRating.get();  
  }
});

Template.unratedGame.events({
  "click .game-item": function(e, template) {
    template.showRatingForm.set(!template.showRatingForm.get());
  },

  "click .rating": function(e, template) {
    e.stopPropagation();
    var rating = e.target.value;
    var gameId = template.data.gameId;
    $(e.target).removeClass("button-outline");
    template.updatingRating.set(true);
    Meteor.call("rateGame", gameId, rating, function(error, response) {
      if (error) {
        console.log(error);
        $(e.target).addClass("button-outline");
      } else {
        games.update({gameId: gameId}, {rating: response.rating});
      }
      template.updatingRating.set(false);
    });
  }
});



