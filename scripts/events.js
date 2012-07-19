$(document).bind("mobileinit", function () {
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
});

function init() {
    //document.addEventListener("deviceready", deviceReady, true);
    $(document).ready(function () {
        //global
        $(".ohl-logout-button").click(authLogout);

        //login screen
        $("#loginForm").on("submit", authHandleLogin);

        //main page
        var mainPage = $("#mainPage");
        mainPage.find("#testLoadsButton").click(loadsGetTestLoads);

        authCheckPreAuth();
    });
}