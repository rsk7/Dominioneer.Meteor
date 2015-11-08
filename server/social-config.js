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
        options.profile.picture = Fb.profilePicture("me", user.services.facebook.accessToken);
        user.profile = options.profile;
    }
    return user;
});

Accounts.registerLoginHandler(function(loginRequest) {
    if(!loginRequest.fbc) {
        return undefined;
    }

    var authResponse = loginRequest.authResponse;
    var identity = Fb.userInfo(authResponse.accessToken);

    var serviceData = {
        accessToken: authResponse.accessToken,
        expiresAt: (+new Date) + (1000 * loginRequest.expiresIn)
    };

    _.extend(serviceData, identity);
    var options = { profile: identity };

    return Accounts.updateOrCreateUserFromExternalService("facebook", serviceData, options);
});

