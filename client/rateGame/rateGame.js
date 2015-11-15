var getGameRating = function(gameId) {
  var gameRating = Ratings.findOne({ gameId: gameId });
  if (gameRating) return gameRating.rating;
};

Template.rateGame.created = function() {
  this.updatingRating = new ReactiveVar(false);
};

Template.rateGame.helpers({
  hasRating: function() {
    return getGameRating(Template.instance().data.gameId) !== undefined;
  },

  ratingValues: function() {
    var values = [
      { name: "Like"   , value:  1 },
      { name: "Meh"    , value:  0 },
      { name: "Dislike", value: -1 }
    ];

    var rating = getGameRating(Template.instance().data.gameId);
    var value = _.findWhere(values, { value: rating });
    if (value) value.selected = true;
    return values;
  },

  updatingRating: function() {
    return Template.instance().updatingRating.get();
  }
});

Template.rateGame.events({
  "click .rating": function(e, template) {
    if (template.data.allowRating && 
        !template.updatingRating.get()) {
      var rating = e.target.value;
      var gameId = template.data.gameId;
      $(e.target).removeClass("button-outline");
      template.updatingRating.set(true);
      Meteor.call("rateGame", gameId, rating, function(err, res) {
        if (err) {
          console.log(err);
          $(e.target).addClass("button-outline");
        }
        template.updatingRating.set(false);
      });
    }
  }
});