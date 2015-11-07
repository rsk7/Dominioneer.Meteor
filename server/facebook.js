Fb = {
  accessToken: function() {
    return Meteor.user().services.facebook.accessToken;
  },

  profilePicture: function(accessToken) {
    var url = "https://graph.facebook.com/v2.3/me/picture/?redirect=false&type=large";
    return HTTP.get(url, { params: { access_token: accessToken || Fb.accessToken() }}).data.data.url;
  },

  friends: function() {
    var url = "https://graph.facebook.com/v2.3/me/friends/";
    return HTTP.get(url, { params: { access_token: Fb.accessToken() }}).data;
  }
};

Meteor.methods({
  getFriends: function() {
    return Fb.friends();
  }
});


