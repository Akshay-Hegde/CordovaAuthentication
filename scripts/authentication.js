function init() {
    document.addEventListener("deviceready", deviceReady, true);
    delete init;
}


function checkPreAuth() {
    console.log("Entering the function: checkPreAuth");
    var form = $("#loginForm");
    if (window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    
    var form = $("#loginForm");
    $("#submitButton", form).attr("disabled", "disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    console.log("Entering the function: handleLogin, information=" + u + "/" + p);
    if (u != '' && p != '') {
//        $.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", { username: u, password: p }, function (res) {
//            if (res == true) {
//                //store
//                window.localStorage["username"] = u;
//                window.localStorage["password"] = p;
//                $.mobile.changePage("home.html");
//            } else {
//                navigator.notification.alert("Your login failed", function () { });
//            }
//            $("#submitButton").removeAttr("disabled");
        //        }, "json");
        console.log("page 2");
        $.mobile.changePage("main.html");
    } else {
        console.log("go on back");
        navigator.notification.alert("You must enter a username and password", function () { });
    }
    $("#submitButton").removeAttr("disabled");
    return false;
}

function deviceReady() {
    $("#loginForm").on("submit", handleLogin);
}