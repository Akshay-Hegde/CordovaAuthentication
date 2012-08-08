function getWeatherGeoLocationSuccess(position) {
    getWeatherFromApi(position);
    getCityState(position, "weatherGetCityStateSuccess");
}

function getWeatherGeoLocationError(data) {
    alert("Error get geolocation data!");
}

function getWeatherFromApi(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.ajax({
        type: "GET",
        url: "http://free.worldweatheronline.com/feed/weather.ashx",
        crossDomain: true,
        timeout: 5000,
        data: { q: latitude + "," + longitude, format: "json", num_of_days: "5", key: "20dd1bb3cd202107120508" },
        dataType: "jsonp",
        jsonpCallback: "weatherDataSuccess",
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown + textStatus + jqXHR);
            console.log("login failure: " + errorThrown + textStatus + jqXHR.getAllResponseHeaders());
        }
    });
    return false;
}

function weatherDataSuccess(responseData) {
    console.log(responseData);
    myWeatherViewModel.populateData(responseData);
    console.log("forecast days: " + myWeatherViewModel.futureDayForecast().length);
    ko.applyBindings(myWeatherViewModel, document.getElementById('weatherPage'));
    $("#weatherPage .weather-data-container").fadeIn(1500);
}

function weatherGetCityStateSuccess(data) {
    updateCityState(data);

    if (city != "unknown") {
        $("#currentWeatherFieldset legend").html("Current Forecast (" + city + ", " + state + ")");
        $("#currentWeatherFieldset320 legend").html("Current Forecast<br>" + city + ", " + state);
    }
    
    console.log(city + ", " + state);
}