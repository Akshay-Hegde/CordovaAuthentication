function WeatherDayViewModel(weather) {
    var self = this;

    self.icon = weather.weatherIconUrl[0].value;
    self.description = weather.weatherDesc[0].value;
    self.minTemperature = weather.tempMinF;
    self.maxTemperature = weather.tempMaxF;
    self.windSpeed = weather.windspeedMiles;
    self.windDirection = weather.winddir16Point;
    self.fcFormatDate = formatDate(weather.date);
    self.fcDayOfWeek = getDayOfWeek(weather.date);
    self.fcAbbrFormatDate = getAbbrMonth(weather.date) + " " + getJsDate(weather.date).getDate()*1;
};

function WeatherViewModel(responseData) {
    var self = this;

    self.icon = ko.observable();
    self.description = ko.observable();
    self.temperature = ko.observable();
    self.windSpeed = ko.observable();
    self.windDirection = ko.observable();
    self.futureDayForecast = ko.observableArray(new Array());

    self.addForecastDay = function (weather) {
        self.futureDayForecast.push(new WeatherDayViewModel(weather));
    };

    self.populateData = function (responseData) {
        self.icon(responseData.data.current_condition[0].weatherIconUrl[0].value);
        self.description(responseData.data.current_condition[0].weatherDesc[0].value);
        self.temperature(responseData.data.current_condition[0].temp_F);
        self.windSpeed(responseData.data.current_condition[0].windspeedMiles);
        self.windDirection(responseData.data.current_condition[0].winddir16Point);

        self.futureDayForecast.removeAll();
        for (i = 0; i < responseData.data.weather.length; i++) {
            self.addForecastDay(responseData.data.weather[i]);
        }
    };
};

function TruckStopResultsViewModel(result) {
    var self = this;

    self.icon = result.icon;
    self.name = result.name;
    self.address = result.formatted_address;
};

function formatDate(date) {
    year = date.substring(0, 4);
    month = date.substring(5, 7) * 1;
    day = date.substring(8, 10) * 1;
    return month + "/" + day + "/" + year;
}

function getJsDate(date) {
    year = date.substring(0, 4);
    month = date.substring(5, 7) * 1;
    day = date.substring(8, 10) * 1;
    return new Date(year, month-1, day);
}

function getDayOfWeek(date) {
    var myDate = getJsDate(date);

    var today = new Date();
    if (myDate.getDate() == today.getDate()) {
        return "Today";
    }

    switch (myDate.getDay()) {
        case 0: return "Sun";
        case 1: return "Mon";
        case 2: return "Tue";
        case 3: return "Wed";
        case 4: return "Thur";
        case 5: return "Fri";
        case 6: return "Sat";
    }
}

function getAbbrMonth(date) {
    var myDate = getJsDate(date);

    switch (myDate.getMonth()) {
        case 0: return "Jan";
        case 1: return "Feb";
        case 2: return "Mar";
        case 3: return "Apr";
        case 4: return "May";
        case 5: return "Jun";
        case 6: return "Jul";
        case 7: return "Aug";
        case 8: return "Sep";
        case 9: return "Oct";
        case 10: return "Nov";
        case 11: return "Dec";
    }
}

var myWeatherViewModel = new WeatherViewModel();
var searchResults = ko.observableArray();


