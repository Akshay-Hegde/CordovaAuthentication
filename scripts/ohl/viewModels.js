function WeatherViewModel(responseData) {
    this.icon = ko.observable(responseData.data.current_condition[0].weatherIconUrl[0].value);
    this.description = ko.observable(responseData.data.current_condition[0].weatherDesc[0].value);
    this.temperature = ko.observable(responseData.data.current_condition[0].temp_F);
    this.windSpeed = ko.observable(responseData.data.current_condition[0].windspeedMiles);
    this.windDirection = ko.observable(responseData.data.current_condition[0].winddir16Point);
}