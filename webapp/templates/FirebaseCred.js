sap.ui.define(["sap/ui/base/Object"], function(BaseObject) {
  var _credentials = {
    apiKey: "AIzaSyD27NvoBOhKS1Ru3PhjnMCBJLwYBYd7AKY",
    authDomain: "ui5appsshowcase.firebaseapp.com",
    databaseURL: "https://ui5appsshowcase.firebaseio.com",
    projectId: "ui5appsshowcase",
    storageBucket: "ui5appsshowcase.appspot.com",
    messagingSenderId: "574130837527"
  };
  return BaseObject.extend("ems.UI5Showcase.util.FirebaseCred", {
    constructor: function() {
      var config = {
        apiKey: this.getApiKey(),
        authDomain: this.getAuthDomain(),
        databaseURL: this.getDatabaseURL(),
        projectId: this.getProjectId(),
        storageBucket: this.getStorageBucket(),
        messagingSenderId: this.getMessagingSenderId()
      };
      firebase.initializeApp(config);
    },
    getCollectionInstance: function() {
      return firebase.firestore().collection("messages");
    },
    getQuery: function() {
      return firebase
        .firestore()
        .collection("messages")
        .orderBy("timestamp", "desc")
        .limit(12);
    },
    getApiKey: function() {
      return _credentials.apiKey;
    },
    getAuthDomain: function() {
      return _credentials.authDomain;
    },
    getDatabaseURL: function() {
      return _credentials.databaseURL;
    },
    getProjectId: function() {
      return _credentials.projectId;
    },
    getStorageBucket: function() {
      return _credentials.storageBucket;
    },
    getMessagingSenderId: function() {
      return _credentials.messagingSenderId;
    }
  });
});
