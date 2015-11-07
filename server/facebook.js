Fb = {
  accessToken: function() {
    return Meteor.user().services.facebook.accessToken;
  },

  profilePicture: function(user_id) {
    var user_id = user_id || "me";
    var url = "https://graph.facebook.com/v2.3/{0}/picture/?redirect=false&type=large"
      .replace("{0}", user_id);
    return HTTP.get(url, { params: { access_token: Fb.accessToken() }}).data.data.url;
  },

  friends: function() {
    var url = "https://graph.facebook.com/v2.3/me/friends/";
    return HTTP.get(url, { params: { access_token: Fb.accessToken() }}).data;
  }
};

Meteor.methods({
  getFriends: function() {
    return Fb.friends().data.map(function(f) {
      return {
        name: f.name,
        profilePic: Fb.profilePicture(f.user_id)
      };
    });
  }
});


