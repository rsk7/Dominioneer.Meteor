App.setPreference('android-targetSdkVersion', '22');
App.accessRule("*");

App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: 973648849342797,
  APP_NAME: "Dominioneer"
});

App.info({
  id: "com.meteor.dominioneer"
  name: "Dominioneer",
  description: "Dominioneer"
});