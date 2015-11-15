Router.configure({
  layoutTemplate: "tabbedLayout"
});

Router.route("/", { template: "games" });
Router.route("/games");
Router.route("/randGame", { layoutTemplate: "layout" });
Router.route("/createGame", { layoutTemplate: "layout" });

Router.route("/history", {
  subscriptions: function() {
    return [ Meteor.subscribe("currentUserGames") ];
  }
});

Router.route("/unrated", {
  subscriptions: function() {
    return [ Meteor.subscribe("currentUserGames") ];
  }
});

Router.route("/settings", {
  subscriptions: function() {
    return [ Meteor.subscribe("currentUserGames") ];
  }
});
