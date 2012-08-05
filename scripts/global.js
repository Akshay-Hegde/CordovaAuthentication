function mainResetPage() {
    $("#testGetLoads").html("");
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
