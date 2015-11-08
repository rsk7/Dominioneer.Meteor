var userFriends = new Mongo.Collection(null);

var selectedUserIds = function() {
  return userFriends.find({
    "selected": true
  }).fetch().map(function(uf) {
    return uf.userId;
  });
};

var hasSelections = function() {
  return selectedUserIds().length;
};

Template.createGame.onRendered(function() {
  userFriends.remove({});
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
  this.showFriends = new ReactiveVar(true);
};

Template.createGame.events({
  "keyup #findFriends": function(e, template) {
    var value = e.target.value || "";
    template.filterTerm.set(value);
  },

  "click #create": function(e, template) {
    if(template.showFriends.get()) {
      var selected = selectedUserIds(); selected.push(Meteor.user().profile.userId); e.target.innerHTML = "Creating game ...";
      Meteor.call("game", selected, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          Session.set("createdGame", data);
          template.showFriends.set(false);
        }
        e.target.innerHTML = "Create game";
      });
    } else {
      template.showFriends.set(true);
    }
  },

  "click #cancel": function(e, template) {
    template.showFriends.set(false);
  }
});

Template.createGame.helpers({
  buttonState: function() {
    return Template.instance().showFriends.get() ?
      "": "button-outline";
  },

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

    var createGameWithString = "with " +
      selected.map(function(s) {
        return s.name;
      }).join(",");

    return createGameWithString;
  },

  cards: function() {
    var createdGame = Session.get("createdGame");
    if (createdGame) {
      return createdGame.cards;
    }
  },

  showFriends: function() {
    return Template.instance().showFriends.get();
  }
});

Template.friend.events({
  "click": function(e) {
    userFriends.update(this._id, {
      "$set": { selected: !this.selected }
    });
  }
});

