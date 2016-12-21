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
            var icon = weatherData.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/"+icon+".png";
            var lat = weatherData.coord.lat;
            var long = weatherData.coord.long;

            var dt = weatherData.dt;

            $('#current-temp').html("<img src=" +iconUrl+ ">The temperature in " + name + " is " + temp + "&deg");

            // Set up a canvas and context
            var canvas = $('#weather-canvas');
            var context = canvas[0].getContext('2d');
            console.log(context);

            // Set up a weather outer circle
            var currPercent = 0;
            function animate(current) {
                // Draw the inner circle
                context.fillStyle = "#ccc";
                context.beginPath();
                context.arc(155, 75, 65, Math.PI * 0, Math.PI * 2);
                context.closePath();
                context.fill();

                // Draw the outer line
                context.lineWidth = 10;
                context.strokeStyle = "#129793";
                context.beginPath();
                context.arc(155, 75, 70, (Math.PI * 1.5), ((Math.PI * 2 * current) + (Math.PI * 1.5)));
                context.stroke();
                currPercent++;
                if (currPercent < temp) {
                    requestAnimationFrame(function() {
                        animate(currPercent / 100);
                    });
                }
            }
            animate();
        });
    });


});
