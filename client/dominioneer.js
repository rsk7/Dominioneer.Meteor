var url = "http://dominioneer.elasticbeanstalk.com/";

Dominioneer = {
	randGame: function(callback) {
		Meteor.http.get(url + "randGame", function(err, res) {
			if (err) return new Meteor.Error("Dominioneer api call failed");
			callback(res.data);
		});
	}
};

