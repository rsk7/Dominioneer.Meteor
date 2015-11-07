Router.configure({
  layoutTemplate: "tabbedLayout"
});

Router.route("/", { template: "games" });
Router.route("/games");
Router.route("/randGame", { layoutTemplate: "layout" });
Router.route("/createGame", { layoutTemplate: "layout" });
Router.route("/history");
Router.route("/unrated");
Router.route("/settings");
