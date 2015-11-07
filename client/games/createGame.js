var userFriends = new Mongo.Collection(null);

var hasSelections = function() {
  return userFriends.find({
    "selected": true
  }).fetch().length;
};

Template.createGame.onRendered(function() {
  Meteor.call("getFriends", function(err, response) {
    if (err) {
      console.log(err)
    } else {
      response.forEach(function(userFriend) {
        userFriends.insert(userFriend);
      });
    }
  });
});

Template.createGame.created = function() {
  this.filterTerm = new ReactiveVar("");
};

Template.createGame.events({
  "keyup #findFriends": function(e, template) {
    var value = e.target.value || "";
    template.filterTerm.set(value);
  },

  "click #create": function(e) {
    if(hasSelections()) {
      console.log("has selections");
    } else {
      console.log("missing selections");
    }
  }
});

Template.createGame.helpers({
  friends: function() {
    var filterTerm = Template.instance().filterTerm.get();
    return userFriends.find({
      "name": { "$regex": ".*" + filterTerm + ".*", "$options": "i" }
    });
  },

  friendsSelected: function() {
    return hasSelections();
  },

  selectedFriends: function() {
    var selected = userFriends.find({
      "selected": true
    }).fetch();

    var createGameWithString = "with ";
    selected.forEach(function(s) {
      createGameWithString += s.name + ",";
    });

    return createGameWithString.slice(0, -1);
  }
});

Template.friend.events({
  "click": function(e) {
    userFriends.update(this._id, {
      "$set": { selected: !this.selected }
    });
  }
});

