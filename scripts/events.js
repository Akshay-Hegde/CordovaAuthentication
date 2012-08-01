$(document).bind("mobileinit", function () {
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
});

function init() {
    //document.addEventListener("deviceready", deviceReady, true);
    $(document).ready(function () {
        var a = navigator.userAgent.toLowerCase();
        var m = !!(a.match(/(iPhone|iPod|iPad|blackberry|android|htc|playbook|kindle|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|webos|x11)/i));
        if (!m) {
//            var pages = $('[data-role="page"]')
//            pages.css("width", "480px");
//            pages.css("height", "480px");
        }

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