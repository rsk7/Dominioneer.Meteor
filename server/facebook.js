Fb = {
  profilePicture: function(accessToken) {
    var url = "https://graph.facebook.com/v2.3/me/picture/?redirect=false&type=large";
    return HTTP.get(url, { params: { access_token: accessToken }}).data.data.url;
  },

  friends: function(accessToken) {
    var url = "https://graph.facebook.com/v2.3/me/friends/";
    return HTTP.get(url).data;
  }
};