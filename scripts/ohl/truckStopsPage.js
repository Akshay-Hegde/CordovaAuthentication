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

// onError Callback receives a PositionError object
//
function geoLocationError(error) {
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}


