Router.configure({
  layoutTemplate: "appLayout"
});

Router.route("/games", function() {
  this.render("games");
});

Router.route("/history", function() {
	this.render("history");
});

Router.route("/unrated", function() {
	this.render("unrated");
});

Router.route("/settings", function() {
	this.render("settings");
});

Router.route("/", function() {
	this.render("games");
});


