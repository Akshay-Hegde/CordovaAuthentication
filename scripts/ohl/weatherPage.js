function getWeatherGeoLocationSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.ajax({
        type: "GET",
        url: "http://free.worldweatheronline.com/feed/weather.ashx",
        crossDomain: true,
        timeout: 5000,
        data: { q: latitude + "," + longitude, format: "json", num_of_day: "4", key: "20dd1bb3cd202107120508" },
        dataType: "jsonp",
        success: function (responseData) {
            console.log(responseData);
            ko.applyBindings(new WeatherViewModel(responseData), document.getElementById('currentWeatherFieldset'));
            $("#weatherPage .weather-data-container").fadeIn(1500);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown + textStatus + jqXHR);
            console.log("login failure: " + errorThrown + textStatus + jqXHR.getAllResponseHeaders());
        }
    });
    return false;
}

function getWeatherGeoLocationError(data) {
    alert("Error get geolocation data!");
}
