
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
      listenForChildChangeEvent(status);
}

function listenForChildChangeEvent() {
    var ref = firebase.database().ref("message");
    ref.on("child_added", function(snapshot) {
        var html = "";
        snapshot = snapshot.val();
        if(snapshot["name"] === "Santosh") {
            html = html + "<span style='padding: 5px; background-color: #dcf8c6; margin-bottom: 10px; float: right;'>";
            html  = html + snapshot["name"] + " : " + snapshot["message"] ;
            html = html + "</span> </br> </br>";
        }
        else {
            html = html + "<span style='padding: 5px; background-color: #ECE5DD; margin-bottom: 10px; float: left;'>";
            html  = html + snapshot["name"] + " : " + snapshot["message"] ;
            html = html + "</span> </br> </br>";
            
        }    
        $(document).ready(function() {
            $("#data").append(html);
        });
    });
}
function storeData() {
    var database = firebase.database().ref("message");
    var newMSG = database.push();
    newMSG.set({
        name : "Santosh",
        message : document.getElementById("msg").value
    });
    document.getElementById("msg").value = "";
}