function authCheckPreAuth() {
    console.log("Entering the function: checkPreAuth");
    var form = $("#loginForm");
    if (window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function authHandleLogin() {
    
    var form = $("#loginForm");
    $("#submitButton", form).attr("disabled", "disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    console.log("Entering the function: handleLogin, information=" + u + "/" + p);
    if (u != '' && p != '') {
        console.log("about ready to post to CordovaLogOn");
        $.ajax({
            type: "GET",
            url: "http://192.168.1.111/CarrierVisibility/Account/CordovaLogOn",
            crossDomain: true,
            timeout: 2000,
            data: { username: u, password: p },
            dataType: "jsonp",
            jsonpCallback: "authLoginSuccess",
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(errorThrown + textStatus + jqXHR);
                console.log("login failure: " + errorThrown + textStatus + jqXHR.getAllResponseHeaders());
                //navigator.notification.alert("Your login failed", function () { });
            }
        });
        console.log("after the ajax call");
    } else {
        console.log("go on back");
        //navigator.notification.alert("You must enter a username and password", function () { });
    }
    $("#submitButton").removeAttr("disabled");
    return false;
}

function authLoginSuccess(data) {
    console.log("JSON from backend => success=" + data.success);
    window.localStorage["username"] = data.username;
    window.localStorage["password"] = data.password;
    $.mobile.changePage("#mainPage");
}

function authLogout() {
    console.log("logging out of application");
    $.ajax({
        type: "GET",
        url: "http://192.168.1.111/CarrierVisibility/Account/CordovaLogOff",
        crossDomain: true,
        timeout: 2000,
        dataType: "jsonp",
        jsonpCallback: "authLogoutSuccess",
        error: function (jqXHR, textStatus, errorThrown) {
            //alert(errorThrown + textStatus + jqXHR);
            console.log("logout failure: " + errorThrown + textStatus + jqXHR.getAllResponseHeaders());
            authReturnToLogonScreen();
            //navigator.notification.alert("Your login failed", function () { });
        }
    });
}

function authLogoutSuccess() {
    console.log("successfully logged out");
    authReturnToLogonScreen(); ;
}

function authReturnToLogonScreen() {
    $("#password").val('');
    $.mobile.changePage("#loginPage");
}
