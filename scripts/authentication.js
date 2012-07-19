function authCheckPreAuth() {
    var form = $("#loginForm");
    if (window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        console.log("Autologging in");
        authHandleLogin();
        return;
    }

    if (window.localStorage["username"] != undefined) {
        var form = $("#loginForm");
        var u = $("#username", form).val(window.localStorage["username"]);
    }
}

function authHandleLogin() {
    
    var form = $("#loginForm");
    $("#submitButton", form).attr("disabled", "disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    if (u != '' && p != '') {
        $.ajax({
            type: "GET",
            url: "http://192.168.1.111/CarrierVisibility/Account/CordovaLogOn",
            crossDomain: true,
            timeout: 2000,
            data: { username: u, password: p },
            dataType: "jsonp",
            jsonpCallback: "authLoginSuccess",
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown + textStatus + jqXHR);
                console.log("login failure: " + errorThrown + textStatus + jqXHR.getAllResponseHeaders());
                //navigator.notification.alert("Your login failed", function () { });
            }
        });
    } else {
        console.log("userid or password is null");
        //navigator.notification.alert("You must enter a username and password", function () { });
    }
    $("#submitButton").removeAttr("disabled");
    return false;
}

function authLoginSuccess(data) {
    window.localStorage.setItem("username", data.username);
    window.localStorage.setItem("password", data.password);
    $.mobile.changePage("#mainPage");
}

function authLogout() {
    console.log("logging out of application");
    window.localStorage.removeItem("password");
    $.ajax({
        type: "GET",
        url: "http://192.168.1.111/CarrierVisibility/Account/CordovaLogOff",
        crossDomain: true,
        timeout: 2000,
        dataType: "jsonp",
        jsonpCallback: "authLogoutSuccess",
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown + textStatus + jqXHR);
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
    //$("#userNotAuthorizedPopup").popup("open");
    $("#password").val('');
    $.mobile.changePage("#loginPage");
}
