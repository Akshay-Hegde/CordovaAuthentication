var searchString = "/www/";

function getPageName(currentUrl) {
    return currentUrl.substr(currentUrl.indexOf(searchString) + searchString.length);
}

function fixgeometry() {
    /* Some orientation changes leave the scroll position at something
    * that isn't 0,0. This is annoying for user experience. */
    scroll(0, 0);

    /* Calculate the geometry that our content area should take */
    var header = $(".ui-header:visible");
    var footer = $(".ui-footer:visible");
    var content = $(".ui-content:visible");
    var viewport_height = $(window).height();

    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();

    /* Trim margin/border/padding height */
    content_height -= (content.outerHeight() - content.height());
    content.height(content_height);
}; /* fixgeometry */


$(document).on('pageinit', function (event) {
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;

    var activePage = $(event.target);
    var pageName = getPageName(activePage.attr('data-url'));
    var pageId = activePage.attr('id');

    if (pageId != "") {
        pageName = pageId;
    }

    switch (pageName) {
        case "loginPage":
        case "index.html":
            //console.log("initializing login page");
            $("#loginPage #submitButton").click(authHandleLogin);
            authCheckPreAuth();

            if (debugUsername != "") {
                $("#loginPage #username").val(debugUsername);
            }
            if (debugPassword != "") {
                $("#loginPage #password").val(debugPassword);
            }

            break;
        case "mainPage":
        case "main.html":
            //console.log("initializing main page");
            $("#mainPage .ohl-logout-button").click(authLogout);
            $("#mainPage #testLoadsButton").click(loadsGetTestLoads);
            break;
        case "truckStopsPage":
        case "truckStops.html":
            //console.log("initializing truck stops page");
            $("#truckStopsPage .ohl-logout-button").click(authLogout);
            break;
        default:
            //alert("unknown page: " + pageName);
    }
});

$(document).on("pageshow", function () {
    //fixgeometry();

    var activePage = $.mobile.activePage;
    var pageName = getPageName(activePage.attr('data-url'));
    var pageId = activePage.attr('id');

    if (pageId != "") {
        pageName = pageId;
    }

    switch (pageName) {
        case "loginPage":
        case "index.html":
            //console.log("showing login page");
            break;
        case "mainPage":
        case "main.html":
            //console.log("showing main page");
            break;
        case "truckStopsPage":
        case "truckStops.html":
            //console.log("showing truck stops page");
            navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError);
            //populateMap();
            break;
        default:
            //alert("unknown page: " + pageName);
    }
});


