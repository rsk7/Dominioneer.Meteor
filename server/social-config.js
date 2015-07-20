Meteor.startup(function() {
    var fbConfig = JSON.parse(Assets.getText(".creds/facebook.json"));

    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });

    ServiceConfiguration.configurations.insert({
        service: "facebook",
        appId: fbConfig.AppId,
        secret: fbConfig.Secret,
        requestPermissions: ['user_friends']
    });
});

Accounts.onCreateUser(function(options, user) {
    if(options.profile) {
        var facebookId = user.services.facebook.id;
        options.profile.picture = "http://graph.facebook.com/" + facebookId + "/picture/?type=large";
        options.profile.userId = facebookId;
        user.profile = options.profile;
    }
    return user;
});

