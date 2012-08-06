function authCheckPreAuth() {
    var form = $("#loginForm");

//    if (window.localStorage.getItem("username") != undefined && window.localStorage.getItem("password") != undefined) {
//        $("#username", form).val(window.localStorage.getItem("username"));
//        $("#password", form).val(window.localStorage.getItem("password"));
//        console.log("Autologging in");
//        authHandleLogin();
//        return;
//    }

//    if (window.localStorage.getItem("username") != undefined) {
//        var u = $("#username", form).val(window.localStorage.getItem("username"));
//    }
}

function authHandleLogin() {
    var form = $("#loginForm");
    $("#submitButton", form).attr("disabled", "disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    if (u != '' && p != '') {
        $.ajax({
            type: "GET",
            url: ajaxBase + "Account/CordovaLogOn",
            crossDomain: true,
            timeout: 5000,
            data: { username: u, password: p },
            dataType: "jsonp",
            jsonpCallback: "authLoginSuccess",
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown + textStatus + jqXHR);
                console.log("login failure: " + errorThrown + textStatus + jqXHR.getAllResponseHeaders());
            }
        });
    } else {
        console.log("userid or password is null"); 
    }
    $("#submitButton").removeAttr("disabled");
    return false;
}

function authLoginSuccess(data) {
    if (data.success == "true") {
//        window.localStorage.setItem("username", data.username);
//        window.localStorage.setItem("password", data.password);
        mainResetPage();
        $.mobile.changePage("main.html");
    } else {
        $("#password").val('');
    }
}

function authLogout() {
    console.log("logging out of application");
    window.localStorage.removeItem("password");
    $.ajax({
        type: "GET",
        url: ajaxBase + "Account/CordovaLogOff",
        crossDomain: true,
        timeout: 2000,
        dataType: "jsonp",
        jsonpCallback: "authLogoutSuccess",
        error: function (jqXHR, textStatus, errorThrown) {
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
    $.mobile.changePage("index.html");
}
