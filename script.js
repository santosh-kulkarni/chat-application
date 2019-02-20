function initialize() {
    var config = {
        apiKey: "AIzaSyDm8CW41tjRth_hQb-6Swf5kI2JNu2wTqY",
        authDomain: "real-time-messaging-cf99d.firebaseapp.com",
        databaseURL: "https://real-time-messaging-cf99d.firebaseio.com",
        projectId: "real-time-messaging-cf99d",
        storageBucket: "real-time-messaging-cf99d.appspot.com",
        messagingSenderId: "103304102616"
      };
      firebase.initializeApp(config);
      getData();
}
function getData() {
    var database = firebase.database().ref("message");
    var newMSG = database.push();
    newMSG.set({
        name : "Santosh",
        message : "What Are You Doing"
    });
}