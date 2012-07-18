$(document).bind("mobileinit", function () {
    $.extend($.mobile, {
        allowCrossDomainPages: true
    });

    $.extend($.support, {
        cors: true
    });
});

function init() {
    //document.addEventListener("deviceready", deviceReady, true);
    $(document).ready(function () {
        $("#loginForm").on("submit", handleLogin);
    });
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
        console.log("about ready to post to CordovaLogOn");
        $.ajax({
            type: "GET",
            url: "http://cnu1480tnh.ohlogistics.com/CarrierVisibility/Account/CordovaLogOn",
            crossDomain: true,
            timeout: 10000,
            data: { username: u, password: p },
            dataType: "jsonp",
            jsonpCallback: "loginSuccess",
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(errorThrown + textStatus + jqXHR);
                console.log("login failure: " + errorThrown + textStatus + jqXHR.getAllResponseHeaders());
                navigator.notification.alert("Your login failed", function () { });
            }
         });
    } else {
        console.log("go on back");
        navigator.notification.alert("You must enter a username and password", function () { });
    }
    $("#submitButton").removeAttr("disabled");
    return false;
}

function loginSuccess(data) {
    console.log("JSON from backend => success=" + data.success);
    window.localStorage["username"] = data.username;
    window.localStorage["password"] = data.password;
    $.mobile.changePage("#mainPage");
}

function deviceReady() {
    $("#loginForm").on("submit", handleLogin);
}