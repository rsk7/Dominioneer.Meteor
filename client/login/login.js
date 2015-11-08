var facebookConnectLogin = function() {
    var fbc = facebookConnectPlugin;
    fbc.getLoginStatus(function(success) {
        if (success.status != "connected") {
            fbc.login(["user_friends"], function(response) {
                response.fbc = true;
                Accounts.callLoginMethod({
                    methodArguments: [response]
                });
            }, function(failure) {
                alert(failure);
            });
        } else {
            success.fbc = true;
            Accounts.callLoginMethod({
                methodArguments: [success]
            })
        }
    })
};

Template.user_loggedout.events({
    "click #facebook-login": function(event) {
        if (Meteor.isCordova) {
            facebookConnectLogin();
        } else {
            Meteor.loginWithFacebook({}, function(err) {
                if (err) throw new Meteor.Error("Facebook login failed");
            });
        }
    }
});

Template.user_loggedin.events({
    "click #logout": function(event) {
        Meteor.logout(function(err) {
            if (err) throw new Meteor.Error("Logout failed");
        });
    }
});



