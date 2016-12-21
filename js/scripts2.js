$(function() {

    $('#weather-form').submit(function() {
        event.preventDefault();
        var weatherZip = $('#weather-zip').val();
        var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip="+weatherZip+",us&appid=" + apiKey;

        // var carbonUrl =
        $.getJSON(weatherUrl, function(weatherData) {
            console.log(weatherData);
            var temp = weatherData.main.temp;
            var name = weatherData.name;
            console.log(weatherData.dt);
            var dt = new Date((weatherData.dt) * 1000).toString();
            console.log(dt);
            var lat = weatherData.coord.lat;
            var long = weatherData.coord.lon;
            var windSpeed = weatherData.wind.speed;
            var windOrigin = weatherData.wind.deg;

            var center = lat + "," + long;
            console.log(center);
            var map = "https://maps.googleapis.com/maps/api/staticmap?center="+center+"&zoom=9&size=500x500&maptype=terrain&markers=color:red&key=" + mapKey;
            $('#location').html(name);
            console.log(map);

            $('#current-datetime').html(dt);
            $('#current-temp').html(temp + "&deg;");
            // $('.widget-body').css({"background": "url("")"});
            $('.widget-body').css("background-image", `url(${map})`);


        });
    });
});
