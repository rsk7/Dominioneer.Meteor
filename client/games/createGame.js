var userFriends = new Mongo.Collection(null);

var selectedUserIds = function() {
  var selectedIds = userFriends.find({
    "selected": true
  }).fetch().map(function(uf) {
    return uf.userId;
  });

  // add current user to the list
  selectedIds.push(Meteor.user().profile.userId);

  return selectedIds;
};

var hasSelections = function() {
  return selectedUserIds().length > 1;
};

Template.createGame.onRendered(function() {
  Session.set("loadingFriends", true);
  Meteor.call("getFriends", function(err, response) {
    if (err) {
      console.log(err)
    } else {
      response.forEach(function(userFriend) {
        userFriends.update(userFriend, userFriend, {upsert: true});
      });
    }
    Session.set("loadingFriends", false);
  });
});

Template.createGame.created = function() {
  this.filterTerm = new ReactiveVar("");
  this.showFriends = new ReactiveVar(true);
  this.createdGame = new ReactiveVar();
};

Template.createGame.events({
  "keyup #findFriends": function(e, template) {
    var value = e.target.value || "";
    template.filterTerm.set(value);
  },

  "click #create": function(e, template) {
    if(template.showFriends.get()) {
      var selected = selectedUserIds(); 
      e.target.innerHTML = "Creating game ...";
      Meteor.call("game", selected, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          template.createdGame.set(data);
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
  loadingFriends: function() {
    return Session.get("loadingFriends");
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

  createGameWithString: function() {
    var selected = userFriends.find({
      "selected": true
    }).fetch();

    var createGameWithString = "with " +
      selected.map(function(s) {
        return s.name;
      }).join(",");

    return createGameWithString;
  },

  selectedUserIds: function() {
    return selectedUserIds();
  },

  game: function() {
    return Template.instance().createdGame.get();
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


