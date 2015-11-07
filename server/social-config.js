Meteor.startup(function() {
    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });

    ServiceConfiguration.configurations.insert({
        service: "facebook",
        appId: Meteor.settings.facebook.AppId,
        secret: Meteor.settings.facebook.Secret,
        requestPermissions: ["user_friends"]
    });
});

Accounts.onCreateUser(function(options, user) {
    if(options.profile) {
        options.profile.userId = user.services.facebook.id;
        options.profile.accessToken = user.services.facebook.accessToken;
        options.profile.picture = Fb.profilePicture(options.profile.accessToken);
        options.profile.username = user.services.facebook.username;
        user.profile = options.profile;
    }
    return user;
});

