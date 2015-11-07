Meteor.startup(function() {
    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });

    ServiceConfiguration.configurations.insert({
        service: "facebook",
        appId: Meteor.settings.facebook.AppId,
        secret: Meteor.settings.facebook.Secret,
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

