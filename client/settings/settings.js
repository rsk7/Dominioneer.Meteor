Template.settings.helpers({
  numberOfGamesPlayed: function() {
    return Ratings.find().count();
  },

  numberOfGamesRated: function() {
    return Ratings.find({ rating: { "$exists": true }}).count();
  }
});