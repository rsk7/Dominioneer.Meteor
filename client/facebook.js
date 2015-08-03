var url = "http://graph.facebook.com/";

Facebook = {
	permissions: function(userId, callback) {
		Meteor.http.get(url + userId + "/permissions", function(err, res) {
			if (err) return new Meteor.Error("Graph api failed");
			callback(res.data);
		});
	}
};