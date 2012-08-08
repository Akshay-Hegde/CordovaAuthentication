function googleMapsReady() {
    alert("callback from google was called");
    googleMapsIsReady = true;
}

function populateMap() {
    if (googleMapsIsReady != true) {
        $("#truckStopsPage #truckStopDiv").html("<p>Not ready</p>");
        return false;
    }

    $("#truckStopsPage #truckStopDiv").html("ready");
}

var geoLocationSuccess = function (position) {
//    alert('Latitude: ' + position.coords.latitude + '\n' +
//          'Longitude: ' + position.coords.longitude + '\n' +
//          'Altitude: ' + position.coords.altitude + '\n' +
//          'Accuracy: ' + position.coords.accuracy + '\n' +
//          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
//          'Heading: ' + position.coords.heading + '\n' +
//          'Speed: ' + position.coords.speed + '\n' +
    //          'Timestamp: ' + position.timestamp + '\n');

    $('#map_canvas').gmap({ 'center': position.coords.latitude + ',' + position.coords.longitude, 'zoom': 10, 'disableDefaultUI': true, 'callback': function () {
        var self = this;
        self.addMarker({ 'position': this.get('map').getCenter() }).click(function () {
            self.openInfoWindow({ 'content': 'Hello World!' }, this);
        });
    } 
    });
};

function getTruckStopsGeolocationSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

// onError Callback receives a PositionError object
//
function getTruckStopsLocationError(error) {
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}

function truckStopSelectChanged() {
    var query = $("#truckStopSearchSelect").val();

    $.ajax({
        type: "GET",
        url: ajaxBase + "Mobile/GetGooglePlaces",
        crossDomain: true,
        timeout: 2000,
        data: { latitude: latitude, longitude: longitude, query: query, radius: 3000 },
        dataType: "jsonp",
        jsonpCallback: "truckStopSelectChangedSuccess",
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown + textStatus + jqXHR);
            console.log("login failure: " + errorThrown + textStatus + jqXHR.getAllResponseHeaders());
        }
    });
    return false;
}

function truckStopSelectChangedSuccess(data) {
    searchResults.removeAll();
    $.each(data.results, function (index, result) {
        searchResults.push(new TruckStopResultsViewModel(result));
    });
}


