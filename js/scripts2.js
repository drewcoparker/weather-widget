$(function() {

    $('#weather-form').submit(function() {
        event.preventDefault();
        var weatherZip = $('#weather-zip').val();
        var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip="+weatherZip+",us&appid=" + apiKey;

        // var carbonUrl =
        $.getJSON(weatherUrl, function(weatherData) {
            // Assign variables to the API data
            // Grab the temp, city name, and datetime fro the API data
            var temp = weatherData.main.temp;
            var name = weatherData.name;
            var dt = new Date((weatherData.dt) * 1000).toString();

            // Grab the location from the API data
            var lat = weatherData.coord.lat;
            var long = weatherData.coord.lon;

            // Grab the wind speed from the API data
            var windSpeed = weatherData.wind.speed;
            var windOrigin = weatherData.wind.deg;

            // Use the location data to construct a map using Google Map API
            var center = lat + "," + long;
            var map = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=9&size=500x300&maptype=terrain&markers=color:red%7C${center}&key=${mapKey}`;

            // Update the DOM with the data collected form the API calls
            $('.widget-body').css("background-image", `url(${map})`);
            $('#location').html(name);
            $('#current-datetime').html(dt);
            $('#current-temp').html(temp + "&deg;");


        });
    });
});
