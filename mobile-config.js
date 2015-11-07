App.setPreference('android-targetSdkVersion', '22');

App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: Meteor.settings.facebook.AppId,
  APP_NAME: Meteor.settings.facebook.AppName
});


