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
            //navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError, { enableHighAccuracy: true });
            var o = { 'center': '36.3047, -86.62', 'zoom': 13, 'streetViewControl': false, 'zoomControl': true, 'panControl': true, 'mapTypeControl': false, 'mapTypeId': 'terrain' };
            $('#map_canvas').gmap(o).bind('init', function (event, map) {
                $('#map_canvas').gmap('addControl', 'control', 1);
                $('#map_canvas').gmap('autocomplete', 'places', function (ui) {
                    $('#map_canvas').gmap('clear', 'markers');
                    $('#map_canvas').gmap('set', 'bounds', null);
                    $.mobile.pageLoading();
                    $('#map_canvas').gmap('placesSearch', { 'location': ui.item.position, 'radius': '5000'/*, 'name': ['store']*/ }, function (results, status) {
                        if (status === 'OK') {
                            $.each(results, function (i, item) {
                                var content = '<div class="places-img"><img src="' + item.icon + '"/></div><div class="places-text"><h3>' + item.name + '</h3></div><div class="clear"></div>';
                                $('#map_canvas').gmap('addMarker', { 'id': item.id, /*'icon': item.icon,*/'position': item.geometry.location, 'bounds': true }).click(function () {
                                    $('#map_canvas').gmap('openInfoWindow', { 'content': content }, this);
                                });
                            });
                        }
                        $.mobile.pageLoading(true);
                    });
                });
                $('#control').show();
            });

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
            navigator.geolocation.getCurrentPosition(getWeatherGeoLocationSuccess, getWeatherGeoLocationError);
            $("#weatherPage .ohl-logout-button").click(authLogout);
            break;
        default:
            //alert("unknown page: " + pageName);
    }
});


