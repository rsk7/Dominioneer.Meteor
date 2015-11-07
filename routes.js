Router.configure({
  layoutTemplate: "appLayout"
});

Router.route("/", { template: "games" });
Router.route("/games");
Router.route("/history");
Router.route("/unrated");
Router.route("/settings");
