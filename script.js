
$(document).ready(function() {
    $("#msg").on("keyup", function(event) {
        if(event.keyCode === 13) {
            storeData();
        }
    });
})
var config = {
    apiKey: "AIzaSyDm8CW41tjRth_hQb-6Swf5kI2JNu2wTqY",
    authDomain: "real-time-messaging-cf99d.firebaseapp.com",
    databaseURL: "https://real-time-messaging-cf99d.firebaseio.com",
    projectId: "real-time-messaging-cf99d",
    storageBucket: "real-time-messaging-cf99d.appspot.com",
    messagingSenderId: "103304102616"
};
firebase.initializeApp(config);

function listenForChildChangeEvent() {
    if (sessionStorage.email == null) {
        window.location.href = "login.html";
    }
    var ref = firebase.database().ref("message");
    ref.on("child_added", function(snapshot) {
        var html = "";
        snapshot = snapshot.val();
        if(snapshot["name"] === "Santosh") {
            html = html + "<span style='padding: 5px 10px 5px 10px; background-color: #dcf8c6; margin-bottom: 10px; float: right;'>";
            html  = html + snapshot["name"] + " </br> " + snapshot["message"] ;
            html = html + "</span> </br> </br> </br>";
        }
        else {
            html = html + "<span style='padding: 5px 10px 5px 10px; background-color: #ffffff; margin-bottom: 10px; float: left;'>";
            html  = html + snapshot["name"] + " </br> " + snapshot["message"] ;
            html = html + "</span> </br> </br> </br>";
        }    
        $(document).ready(function() {
            $("#data").append(html);
            $("#scrollDown").scrollTop($("#scrollDown")[0].scrollHeight);
        });
    });

    ref = firebase.database().ref("users");
    ref.once("value", function(snapshot) {
        snapshot = snapshot.val();
        var html = "";
        for(val in snapshot) {
            html = html + "<div> <img  src='man.png' style='display: inline; width: 30px; height: 30px;' alt='Profile Photo' /> <h5 style='padding-left: 10px; display: inline'>" + snapshot[val]["displayName"] + "</h5></div><hr>";
        }
        $(document).ready(function() {
            $("#usersData").html(html);
        });
    });
}
function storeData() {
    var database = firebase.database().ref("message");
    var newMSG = database.push();
    console.log(document.getElementById("msg").value);
    newMSG.set({
        name : "Santosh",
        message : document.getElementById("msg").value
    });
    document.getElementById("msg").value = "";
}
function login() {
    var email = document.getElementById('emailid').value;
    var pass = document.getElementById("pass").value;
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage);
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
           sessionStorage.email = user.emailVerified;
           window.location.href = "home.html";
        } 
        else {
            sessionStorage.email = null;
        }
      });
}
