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

function getCityState(position, successFunction) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.ajax({
        type: "GET",
        url: ajaxBase + "Mobile/GetCityState",
        crossDomain: true,
        timeout: 2000,
        data: { latitude: latitude, longitude: longitude },
        dataType: "jsonp",
        jsonpCallback: successFunction,
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown + textStatus + jqXHR);
            console.log("login failure: " + errorThrown + textStatus + jqXHR.getAllResponseHeaders());
        }
    });
    return false;
}

function getCityStateError() {
    console.log("City State Error");
}

function updateCityState(data) {
    $.each(data.results, function (index, result) {
        if (result.types[0] == "locality") {
            $.each(result.address_components, function (index2, result2) {
                if (result2.types[0] == "locality") {
                    city = result2.long_name;
                } else if (result2.types[0] == "administrative_area_level_1") {
                    state = result2.short_name;
                }
            });
        }
    });
}


$(document).on('pageinit', function (event) {
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
    $.mobile.selectmenu.prototype.options.nativeMenu = false;

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
            //$('#mainPage a').transify({ opacityOrig: .3, opacityNew: .7, fadeSpeed: 200 });
            break;
        case "truckStopsPage":
        case "truckStops.html":
            //console.log("initializing truck stops page");
            $('#truckStopSearchSelect').change(truckStopSelectChanged);
            ko.applyBindings({ truckStopResults: searchResults });
            $("#truckStopsPage .ohl-logout-button").click(authLogout);
            break;
        case "weatherPage":
        case "weather.html":
            //console.log("initializing truck stops page");
            
            $("#weatherPage .ohl-logout-button").click(authLogout);
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
            navigator.geolocation.getCurrentPosition(getTruckStopsGeolocationSuccess, getTruckStopsLocationError);
            var defaultValue = $('#places').val();
            $('#places').focus(function () {
                if ($(this).val() === defaultValue) {
                    $(this).val('');
                }
            }).blur(function () {
                if ($(this).val() == '') {
                    $(this).val(defaultValue);
                }
            });
            //populateMap();
            break;
        case "weatherPage":
        case "weather.html":
            //console.log("initializing truck stops page");
            $("#currentWeatherFieldset legend").html("Current Forecast");
            $("#currentWeatherFieldset320 legend").html("Current Forecast");
            navigator.geolocation.getCurrentPosition(getWeatherGeoLocationSuccess, getWeatherGeoLocationError);
            $("#weatherPage .ohl-logout-button").click(authLogout);
            break;
        default:
            //alert("unknown page: " + pageName);
    }
});


