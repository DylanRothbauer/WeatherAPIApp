// Free version of API
// Function to get weather based on user's current location
function GetWeatherByCurrentLocation(key) {
    // Check if Geolocation is supported by the browser
    if (navigator.geolocation) {
        // Get current position (latitude and longitude)
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            // Construct API URL with latitude and longitude
            var currentAPIURL = `https://api.weatherapi.com/v1/current.json?q=${lat},${lon}&aqi=yes&key=${key}`;
            var forecastAPIURL = `https://api.weatherapi.com/v1/forecast.json?q=${lat},${lon}&days=8&alerts=yes&key=${key}`;

            // Function to handle current weather API call
            var GetCurrentWeather = function() {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            var response = JSON.parse(xhr.responseText);
                            DisplayCurrentWeather(response); // Call function to display current weather
                            DisplayMore(response);
                            DisplayAirQuality(response);
                        } else {
                            console.log("Error fetching current weather: " + xhr.status + " - " + xhr.statusText);
                        }
                    }
                };
                xhr.open("GET", currentAPIURL, true);
                xhr.send();
            };

            // Function to handle forecast weather API call
            var GetWeatherForecast = function() {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            var response = JSON.parse(xhr.responseText);
                            DisplayWeatherForecast(response); // Call function to display weather forecast
                            DisplayWeatherHourly(response);
                            DisplayAstro(response);
                            DisplayAlert(response);
                        } else {
                            console.log("Error fetching weather forecast: " + xhr.status + " - " + xhr.statusText);
                        }
                    }
                };
                xhr.open("GET", forecastAPIURL, true);
                xhr.send();
            };

            // Call both functions to initiate API requests
            GetCurrentWeather();
            GetWeatherForecast();

        }, function(error) {
            console.error("Error getting geolocation:", error);
            // Handle errors in getting geolocation here
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
        // Handle scenario where geolocation is not supported
    }
}

// Call this function when the app loads to fetch weather based on current location
document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '43bc5e3833c44773809200820242506';
    GetWeatherByCurrentLocation(apiKey);

    const form = document.getElementById('searchForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page
        const city = document.getElementById('location').value;
        GetWeather(city, apiKey);
    });
});

// Helper function to clear existing weather data
function ClearWeatherData() {
    var currentDisplay = document.getElementById('current');
    var hourlyDisplay = document.getElementById('hourly');
    var forecastDisplay = document.getElementById('forecast');
    var astroDisplay = document.getElementById('astro');
    var moreDisplay = document.getElementById('more');
    // Clear existing content
    currentDisplay.innerHTML = '';
    hourlyDisplay.innerHTML = ''; 
    forecastDisplay.innerHTML = ''; 
    astroDisplay.innerHTML = ''; 
    moreDisplay.innerHTML = ''; 
}

function GetDayWeatherIcon(condition) {

    switch (condition.toLowerCase()) {
        case 'sunny':
        case 'clear ':
            return 'wi-day-sunny';
        case 'partly cloudy ':
        case 'partly cloudy':
        case 'cloudy':
        case 'cloudy ':
            return 'wi-day-cloudy';
        case 'overcast':
        case 'overcast ':
            return 'wi-day-sunny-overcast';
        case 'patchy rain nearby':
        case 'patchy light drizzle':
        case 'patchy light rain':
            return 'wi-day-sprinkle';
        case 'light rain':
        case 'light drizzle':
        case 'light rain shower':
        case 'moderate rain at times':
            return 'wi-day-showers';
        case 'rain':
        case 'moderate rain':
        case 'moderate or heavy rain shower':
        case 'heavy rain':
            return 'wi-day-rain';
        case 'patchy light rain in area with thunder':
        case 'patchy light rain with thunder':
            return 'wi-day-storm-showers';
        case 'snow':
        case 'light snow':
        case 'heavy snow':
            return 'wi-day-snow';
        case 'fog':
        case 'mist':
            return 'wi-day-fog';
        case 'thundery outbreaks in nearby':
        case 'moderate or heavy rain with thunder':
            return 'wi-day-thunderstorm';
        // Add more cases for other weather conditions as needed
        default:
            return 'wi-na'; // Default icon if condition doesn't match
    }
}

function GetNightWeatherIcon(condition) {

    switch (condition.toLowerCase()) {
        case 'clear ':
            return 'wi-night-clear';
        case 'partly cloudy ':
        case 'partly cloudy':
            return 'wi-night-alt-partly-cloudy';
        case 'cloudy':
        case 'cloudy ':
        case 'overcast':
        case 'overcast ':
            return 'wi-night-alt-cloudy';
        case 'patchy light rain':
        case 'patchy rain nearby':
        case 'patchy light drizzle':
            return 'wi-night-sprinkle';
        case 'light rain':
        case 'light drizzle':
        case 'light rain shower':
        case 'moderate rain at times':
            return 'wi-night-alt-showers';
        case 'rain':
        case 'moderate rain':
        case 'moderate or heavy rain shower':
        case 'heavy rain':
            return 'wi-night-alt-rain';
        case 'snow':
        case 'light snow':
        case 'heavy snow':
            return 'wi-snow';
        case 'fog':
        case 'mist':
            return 'wi-night-fog';
        case 'thundery outbreaks in nearby':
            return 'wi-night-alt-thunderstorm';
        // Add more cases for other weather conditions as needed
        default:
            return 'wi-na'; // Default icon if condition doesn't match
    }
}
// Function to get Weather Icons class based on condition text
function GetWeatherIconClass(isDay, condition) {

    if (isDay) {
        return GetDayWeatherIcon(condition);
    } else {
        return GetNightWeatherIcon(condition);
    }
}

function GetWindIcon(windDirection) {
    switch(windDirection.toLowerCase()) {
        case 'n':
            return 'wi-towards-n';
        case 'e':
            return 'wi-towards-e';
        case 's':
            return 'wi-towards-s';
        case 'w':
            return 'wi-towards-w';
        case 'nne':
            return 'wi-towards-nne';
        case 'ese':
            return 'wi-towards-ese';
        case 'ssw':
            return 'wi-towards-ssw';
        case 'wnw':
            return 'wi-towards-wnw';
        case 'ne':
            return 'wi-towards-ne';
        case 'se':
            return 'wi-towards-se';
        case 'sw':
            return 'wi-towards-sw';
        case 'nw':
            return 'wi-towards-nw';
        case 'ene':
            return 'wi-towards-ene';
        case 'sse':
            return 'wi-towards-sse';
        case 'wsw':
            return 'wi-towards-wsw';
        case 'nnw':
            return 'wi-towards-nnw';
        
        default:
            return 'wi-na';
    }
}

function GetMoonIcon(moonPhase, moonIllum) {

    if (moonPhase.toLowerCase() == "new moon") {
        return 'wi-moon-alt-new';
    }

    if (moonPhase.toLowerCase() == "first quarter") {
        return 'wi-moon-alt-first-quarter';
    }

    if (moonPhase.toLowerCase() == "full moon") {
        return 'wi-moon-alt-full';
    }

    if (moonPhase.toLowerCase() == "third quarter") {
        return 'wi-moon-alt-thrid-quarter';
    }

    if (moonPhase.toLowerCase() == "waxing crescent") {
        switch(moonIllum) {
            case 1:
                return 'wi-moon-alt-waxing-crescent-1';
            case 2:
                return 'wi-moon-alt-waxing-crescent-2';
            case 3:
                return 'wi-moon-alt-waxing-crescent-3';
            case 4:
                return 'wi-moon-alt-waxing-crescent-4';
            case 5:
                return 'wi-moon-alt-waxing-crescent-5';
            case 6:
                return 'wi-moon-alt-waxing-crescent-6';
            default:
                return 'wi-na';
        }
    } else if (moonPhase.toLowerCase() == "waxing gibbous") {
        switch(moonIllum) {
            case 1:
                return 'wi-moon-alt-waxing-gibbous-1';
            case 2:
                return 'wi-moon-alt-waxing-gibbous-2';
            case 3:
                return 'wi-moon-alt-waxing-gibbous-3';
            case 4:
                return 'wi-moon-alt-waxing-gibbous-4';
            case 5:
                return 'wi-moon-alt-waxing-gibbous-5';
            case 6:
                return 'wi-moon-alt-waxing-gibbous-6';
            default:
                return 'wi-na';
        }
    } else if (moonPhase.toLowerCase() == "waning gibbous") {
        switch(moonIllum) {
            case 1:
                return 'wi-moon-alt-waning-gibbous-1';
            case 2:
                return 'wi-moon-alt-waning-gibbous-2';
            case 3:
                return 'wi-moon-alt-waning-gibbous-3';
            case 4:
                return 'wi-moon-alt-waning-gibbous-4';
            case 5:
                return 'wi-moon-alt-waning-gibbous-5';
            case 6:
                return 'wi-moon-alt-waning-gibbous-6';
            default:
                return 'wi-na';
        }
    } else if (moonPhase.toLowerCase() == "waning crescent") {
        switch(moonIllum) {
            case 1:
                return 'wi-moon-alt-waning-crescent-1';
            case 2:
                return 'wi-moon-alt-waning-crescent-2';
            case 3:
                return 'wi-moon-alt-waning-crescent-3';
            case 4:
                return 'wi-moon-alt-waning-crescent-4';
            case 5:
                return 'wi-moon-alt-waning-crescent-5';
            case 6:
                return 'wi-moon-alt-waning-crescent-6';
            default:
                return 'wi-na';
        }

    }
}

function GetEPAStatus(EPAIndex) {
    switch(EPAIndex) {
        case 1:
            return 'Good';
        case 2:
            return 'Moderate';
        case 3:
            return 'Unhealthy for sensitive group';
        case 4:
            return 'Unhealthy';
        case 5:
            return 'Very Unhealthy';
        case 6:
            return 'Hazardous';
        default:
            return 'N/A';
    }
}

// So we don't need an onClick(), its a listener
// document.addEventListener("DOMContentLoaded", function() {
//     displayCurrent();
//     displayHourly();
//     displayForecast();
//     displayAstro();
//     displayMore();
// });


/*
* Get Weather
*/
function GetWeather(city, apiKey) {
    ClearWeatherData();
    var currentAPIURL = "https://api.weatherapi.com/v1/current.json?q=" + city + "&aqi=yes" + "&key=" + apiKey;
    var forecastAPIURL = "https://api.weatherapi.com/v1/forecast.json?q=" + city + "&days=8" + "&alerts=yes" + "&key=" + apiKey;

    // Function to handle current weather API call
    var GetCurrentWeather = function () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    DisplayCurrentWeather(response); // Call function to display current weather
                    DisplayMore(response); // Call funciton to display more current information
                    DisplayAirQuality(response);
                } else {
                    console.log("Error fetching current weather: " + xhr.status + " - " + xhr.statusText);
                }
            }
        };
        xhr.open("GET", currentAPIURL, true);
        xhr.send();
    };

    // Function to handle forecast weather API call
    var GetWeatherForecast = function () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    DisplayWeatherForecast(response); // Call function to display weather forecast
                    DisplayWeatherHourly(response); // Call funciton to display hourly forecast
                    DisplayAstro(response); // Call function to display astro information
                    DisplayAlert(response);
                } else {
                    console.log("Error fetching weather forecast: " + xhr.status + " - " + xhr.statusText);
                }
            }
        };
        xhr.open("GET", forecastAPIURL, true);
        xhr.send();
    };

    // Call both functions to initiate API requests
    GetCurrentWeather();
    GetWeatherForecast();
}

/*
* Displaying Current Weather
*/
function DisplayCurrentWeather(response) {
    // Access basic current information
    var location = response.location.name + ', ' + response.location.region;
    var tempF = response.current.temp_f;
    var condition = response.current.condition.text;
    var iconUrl = response.current.condition.icon;
    var feelsLikeF = response.current.feelslike_f;

    var country = response.location.country;
    var lat = response.location.lat;
    var lon = response.location.lon;
    var timeZone = response.location.tz_id;

    var isDay = response.current.is_day;
    

    var iconClass = GetWeatherIconClass(isDay, condition);

    // Construct HTML to display
    var html = `
        <div class="col">
            <h2>${location}</h2>
            <p class="currentTemp">${tempF}°F</p>
            <p>Feels like ${feelsLikeF}°F</p>
            
            <p>${condition}</p>
            <!--<img src="${iconUrl}" alt="Weather Icon">-->
        </div>

        <div class="col">
            <div class="row" id="current">
                <div class="col" style="text-align:center">
                    <i class="wi ${iconClass} current-icon"></i>
                </div>

                <div class="col" style="text-align:right">
                    <p>${country}</p>
                    <p>${lat} | ${lon}</p>
                    <p>${timeZone}</p>
                </div>
            </div>
        </div>
    `;

    // Display in the HTML element with id "sample"
    document.getElementById("current").innerHTML = html;
    //document.getElementById("more").innerHTML = moreHTML;
}

/*
* Displays additional information (wind, pressure, etc)
*/
function DisplayMore(response) {

    // Access other/more current information
    var windSpeed = response.current.wind_mph;
    var windDirection = response.current.wind_dir;
    var pressure = response.current.pressure_in;
    var humidity = response.current.humidity;
    var dewpoint = response.current.dewpoint_f;

    var cloudCoverage = response.current.cloud;
    var visability = response.current.vis_miles;
    var UV = (response.current.uv).toFixed(2);
    var windGust = response.current.gust_mph;

    var windIcon = GetWindIcon(windDirection);

    // Construct HTML to display
    var moreHTML = `
        <div class="col-6">
            <div class="item row">
                <div class="col">
                    <p>Wind</p>
                    <i class="wi wi-windy weatherIcon"></i>
                    <p>${windSpeed} mph <i class="wi wi-wind ${windIcon}"></i></p>
                </div>
            </div>
        </div>

        <div class="col-6">
            <div class="item row">
                <div class="col">
                    <p>Pressure</p>
                    <i class="wi wi-barometer weatherIcon"></i>
                    <p>${pressure} in</p>
                </div>
            </div>
        </div>
                    
        <div class="col-6">
            <div class="item row">
                <div class="col">
                    <p>Humidity</p>
                    <i class="wi wi-humidity weatherIcon"></i>
                    <p>${humidity}%</p>
                </div>
            </div>
        </div>
                    
        <div class="col-6">
            <div class="item row">
                <div class="col">
                    <p>Dew point</p>
                    <i class="wi wi-raindrop weatherIcon"></i>
                    <p>${dewpoint}°</p>
                </div>
            </div>
        </div>

        <div class="col-6">
            <div class="item row">
                <div class="col">
                    <p>Cloud Coverage</p>
                    <i class="wi wi-cloud weatherIcon"></i>
                    <p>${cloudCoverage}%</p>
                </div>
            </div>
        </div>

        <div class="col-6">
            <div class="item row">
                <div class="col">
                    <p>Visability</p>
                    <img src="other-images/visibility.png" alt="Visability image">
                    <p>${visability} miles</p>
                </div>
            </div>
        </div>

        <div class="col-6">
            <div class="item row">
                <div class="col">
                    <p>UV Index</p>
                    <img src="other-images/uv.png" alt="UV image">
                    <p>${UV}</p>
                </div>
            </div>
        </div>

        <div class="col-6">
            <div class="item row">
                <div class="col">
                    <p>Wind Gust</p>
                    <i class="wi wi-strong-wind weatherIcon"></i>
                    <p>${windGust} mph</p>
                </div>
            </div>
        </div>

    `;

    document.getElementById("more").innerHTML = moreHTML;
}

/*
* Display Air Quality
*/
function DisplayAirQuality(response) {

    var carbonMonoxide = response.current.air_quality.co;
    var ozone = response.current.air_quality.no2;
    var nitrogenDioxide = response.current.air_quality.o3;
    var sulphurDioxide = response.current.air_quality.so2;
    var EPAIndex = response.current.air_quality['us-epa-index'];

    var EPAStatus = GetEPAStatus(EPAIndex);

    airQaulityHTML =`
        <div class="item row">
            <div class="col-12">
                <h3>Air Quality</h3>
            </div>

            <div class="col">
                <p id="bold">Carbon Mionoxide</p>
                <p>${carbonMonoxide} (μg/m3)</p>
            </div>

            <div class="col">
                <p id="bold">Ozone</p>
                <p>${ozone} (μg/m3)</p>
            </div>

            <div class="col">
                <p id="bold">Nitrogen Dioxide</p>
                <p>${nitrogenDioxide} (μg/m3)</p>
            </div>

            <div class="col">
                <p id="bold">Sulphur Dioxide</p>
                <p>${sulphurDioxide} (μg/m3)</p>
            </div>

            <div class="col">
                <p id="bold">EPA Status</p>
                <p>${EPAStatus}</p>
            </div>

        </div>
    `;

    document.getElementById("air-quality").innerHTML = airQaulityHTML;
}
/*
* Display Alerts
*/
function DisplayAlert(response) {
    // Check if alerts array exists and has elements
    if (response.alerts.alert.length > 0) {
        var alert = response.alerts.alert[0]; // Assuming you want to display the first alert if multiple
        var headline = alert.headline;
        var category = alert.category;
        var event = alert.event;
        var effective = alert.effective;
        var expires = alert.expires;
        var effectiveDate = new Date(effective);
        var expiresDate = new Date(expires);
        var description = alert.desc;

        var alertHTML = `
            <div class="item row">
                <div class="col-12">
                    <h3>Alert</h3>
                </div>

                <div class="col">
                    <p id="bold">Headline</p>
                    <p>${headline}</p>
                </div>

                <div class="col">
                    <p id="bold">Category</p>
                    <p>${category}</p>
                </div>

                <div class="col">
                    <p id="bold">Event</p>
                    <p>${event}</p>
                </div>

                <div class="col">
                    <p id="bold">
                        Effective:
                        <p>${effectiveDate.toLocaleString()}</p>
                    </p>
                </div>

                <div class="col">
                    <p id="bold">
                        Expires:
                        <p>${expiresDate.toLocaleString()}</p>
                    </p>
                </div>

                <div class="col-12">
                    <p id="bold">Description</p>
                    <p>${description}</p>
                </div>

            </div>
        `;

        document.getElementById("alert").innerHTML = alertHTML;
    } else {
        // Handle case where no alerts are available
        var noAlertHTML = `
            <div class="item row">
                <div class="col-12">
                    <p>No alerts available</p>
                </div>
            </div>
        `;
        document.getElementById("alert").innerHTML = noAlertHTML;
    }
}

/*
* Displays Forecast
*/
function DisplayWeatherForecast(response) {
    // Access elements of response object
    var forecastData = response.forecast.forecastday;
    var forecastHTML = '';

    forecastData.forEach(function (day) {
        var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        var forecastDay = day;

        // Get the date in YYYY-MM-DD format
        var date = forecastDay.date;

        // Convert date string to a Date object
        var dateTime = new Date(date);

        // Get the day of the week (e.g., "Monday", "Tuesday") using an array of weekday names
        var dayOfWeek = daysOfWeek[dateTime.getDay()]; // getDay() returns a number (0-6) representing the day of the week

        // Check if the date is today
        var today = new Date();
        var todayDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

        if (date === todayDate) {
            //return;
            dayOfWeek = "Today";
        }

        var maxTempF = day.day.maxtemp_f;
        var minTempF = day.day.mintemp_f;
        var averageTempF = day.day.avgtemp_f;
        var maxWind = day.day.maxwind_mph;
        var totalPrecip = day.day.totalprecip_in;
        var chanceOfRain = day.day.daily_chance_of_rain;
        var chanceOfSnow = day.day.daily_chance_of_snow;
        var avgHumidity = day.day.avghumidity;

        var condition = day.day.condition.text;
        var iconUrl = day.day.condition.icon;

        // For forecast, we will display daytime
        var isDay = 1;

        var iconClass = GetWeatherIconClass(isDay, condition);

        forecastHTML += `
            <div class="col">
                <p>
                    <h3>${dayOfWeek}</h3>
                    <i class="wi ${iconClass} weatherIcon"></i>
                </p>

                <p>
                    <i class="wi wi-direction-up"></i>
                    ${maxTempF}
                    <i class="wi wi-fahrenheit"></i>

                    <i class="wi wi-direction-down"></i>
                    ${minTempF}
                    <i class="wi wi-fahrenheit"></i>
                </p>

                <p>
                    <i class="wi wi-windy"></i>
                    ${maxWind} mph

                    <i class="wi wi-snow"></i>
                    ${chanceOfSnow}%
                </p>
                
                <p>
                    <i class="wi wi-raindrops"></i>
                    ${chanceOfRain}% | ${totalPrecip} in
                </p>

                <p>
                    ~ ${averageTempF}
                    <i class="wi wi-fahrenheit"></i>

                    <i class="wi wi-humidity"></i>
                    ${avgHumidity}%
                </p>

                <p>${condition}</p>
                <!--<img src="${iconUrl}" alt="Weather Icon">-->
                
            </div>
        `;
    });

    document.getElementById("forecast").innerHTML += forecastHTML;
}

/*
* Displays hourly information
*/
function DisplayWeatherHourly(response) {

    var hourlyData = response.forecast.forecastday[0].hour;
    var hourlyHTML = '';

    // Loop through each hour's data
    hourlyData.forEach(function (hour) {

        var dateTime = new Date(hour.time);
        // var time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var options = { hour: 'numeric', hour12: true };
        var time = dateTime.toLocaleTimeString([], options).replace(/^0/, '');


        //var time = hour.time;
        var tempF = hour.temp_f;
        var condition = hour.condition.text;
        var iconUrl = hour.condition.icon;

        var isDay = hour.is_day;

        var iconClass = GetWeatherIconClass(isDay, condition);

        // Construct HTML for each hour
        hourlyHTML += `
            <div class="col">
                <div class="time">
                    <h3>${time}</h3>
                </div>
                <i class="wi ${iconClass} weatherIcon"></i>
                <p>${tempF}
                <i class="wi wi-fahrenheit"></i>
                </p>
                
                <p>${condition}</p>
                <!--<img src="${iconUrl}" alt="${condition}">-->
            </div>
        `;
    });

    // Append the constructed HTML to the element with id "hourly"
    document.getElementById("hourly").innerHTML = hourlyHTML;
}

/*
* Displays Astro information
*/
function DisplayAstro(response) {

    var astroData = response.forecast.forecastday[0].astro;
    var astroHTML = ``;

    var sunrise = astroData.sunrise;
    var sunset = astroData.sunset;
    var moonrise = astroData.moonrise;
    var moonset = astroData.moonset;

    var moonPhase = astroData.moon_phase;
    var moonIllum = astroData.moon_illumination;

    var moonIcon = GetMoonIcon(moonPhase, moonIllum);

    astroHTML += `
        <div class="col-6">
            <div class="item row">
                <div class="col">
                    <p>Sunrise</p>
                    <i class="wi wi-sunrise weatherIcon"></i>
                    <p>${sunrise.replace(/^0+(?=\d)/, '')}</p>
                </div>
                
                <div class="col">
                    <p>Sunset</p>
                    <i class="wi wi-sunset weatherIcon"></i>
                    <p>${sunset.replace(/^0+(?=\d)/, '')}</p>
                </div>
            </div>
        </div>

        <div class="col-6">
            <div class="item row">
                <div class="col">
                    <p>Moonrise</p>
                    <i class="wi wi-moonrise weatherIcon"></i>
                    <p>${moonrise.replace(/^0+(?=\d)/, '')}</p>
                </div>

                <div class="col custom-col">
                    <i class="wi ${moonIcon} weatherIcon"></i>
                    <p>${moonPhase}</p>
                </div>
                
                <div class="col">
                    <p>Moonset</p>
                    <i class="wi wi-moonset weatherIcon"></i>
                    <p>${moonset.replace(/^0+(?=\d)/, '')}</p>
                </div>
            </div>
        </div>
                    
    `;

    // Append the constructed HTML to the element with id "hourly"
    document.getElementById("astro").innerHTML = astroHTML;
}

/* OLD ======================================================================================== */
// /*
// * Current
// */
// function displayCurrent() {
//     var myObj = new XMLHttpRequest();
//     var key = "43bc5e3833c44773809200820242506";
//     var apiUrl = "https://api.weatherapi.com/v1/current.json?q=Little%20Chute&key=" + key;

//     myObj.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             if (this.status == 200) {
//                 // Parse JSON response
//                 var response = JSON.parse(this.responseText);

//                 // Access elements of response object
//                 var location = response.location.name + ', ' + response.location.region;
//                 var tempF = response.current.temp_f;
//                 var condition = response.current.condition.text;
//                 var iconUrl = response.current.condition.icon;
//                 var feelsLikeF = response.current.feelslike_f;

//                 // Construct HTML to display
//                 var html = `
//                     <div>
//                         <h2>${location}</h2>
//                         <p class="currentTemp">${tempF}°F</p>
//                         <p>Feels like ${feelsLikeF}°F</p>
//                         <p>${condition}</p>
//                         <img src="${iconUrl}" alt="Weather Icon">
//                     </div>
//                 `;

//                 // Display in the HTML element with id "sample"
//                 document.getElementById("current").innerHTML = html;
//             } else {
//                 console.log("Error: " + this.status + " - " + this.statusText);
//             }
//         }
//     };

//     myObj.open("GET", apiUrl, true);
//     myObj.send();
// }


// /*
// * Forecast
// */
// function displayForecast() {
//     var myObj = new XMLHttpRequest();
//     var key = "43bc5e3833c44773809200820242506";
//     var apiUrl = "https://api.weatherapi.com/v1/forecast.json?q=Little%20Chute&days=8&key=" + key;

//     myObj.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             if (this.status == 200) {
//                 var response = JSON.parse(this.responseText);

//                 var forecastData = response.forecast.forecastday;
//                 var forecastHTML = '';

//                 forecastData.forEach(function (day) {
//                     var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//                     var forecastDay = day;

//                     // Get the date in YYYY-MM-DD format
//                     var date = forecastDay.date;

//                     // Convert date string to a Date object
//                     var dateTime = new Date(date);

//                     // Get the day of the week (e.g., "Monday", "Tuesday") using an array of weekday names
//                     var dayOfWeek = daysOfWeek[dateTime.getDay()]; // getDay() returns a number (0-6) representing the day of the week

//                     // Check if the date is today
//                     var today = new Date();
//                     var todayDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

//                     if (date === todayDate) {
//                         dayOfWeek = "Today";
//                     }

//                     var maxTempF = day.day.maxtemp_f;
//                     var minTempF = day.day.mintemp_f;
//                     var condition = day.day.condition.text;
//                     var iconUrl = day.day.condition.icon;

//                     forecastHTML += `
//                         <div class="col">
//                             <h3>${dayOfWeek}</h3>
//                             <p>Max Temp: ${maxTempF}°F</p>
//                             <p>Min Temp: ${minTempF}°F</p>
//                             <p>Condition: ${condition}</p>
//                             <img src="${iconUrl}" alt="Weather Icon">
//                         </div>
//                     `;
//                 });

//                 document.getElementById("forecast").innerHTML += forecastHTML;
//             } else {
//                 console.log("Error: " + this.status + " - " + this.statusText);
//             }
//         }
//     };

//     myObj.open("GET", apiUrl, true);
//     myObj.send();
// }


// /*
// * Hourly Forecast
// */
// function displayHourly() {
//     var myObj = new XMLHttpRequest();
//     var key = "43bc5e3833c44773809200820242506";
//     var apiUrl = "https://api.weatherapi.com/v1/forecast.json?q=Little%20Chute&days=1&key=" + key;

//     myObj.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             if (this.status == 200) {
//                 var response = JSON.parse(this.responseText);

//                 var hourlyData = response.forecast.forecastday[0].hour;
//                 var hourlyHTML = '';

//                 // Loop through each hour's data
//                 hourlyData.forEach(function (hour) {

//                     var dateTime = new Date(hour.time);
//                     var time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//                     //var time = hour.time;
//                     var tempF = hour.temp_f;
//                     var condition = hour.condition.text;
//                     var iconUrl = hour.condition.icon;

//                     // Construct HTML for each hour
//                     hourlyHTML += `
//                     <div class="col">
//                         <h3>${time}</h3>
//                         <p>${tempF} °F</p>
//                         <p>Condition: ${condition}</p>
//                         <img src="${iconUrl}" alt="${condition}">
//                     </div>
//                     `;
//                 });

//                 // Append the constructed HTML to the element with id "hourly"
//                 document.getElementById("hourly").innerHTML = hourlyHTML;
//             } else {
//                 console.log("Error: " + this.status + " - " + this.statusText);
//             }
//         }
//     };

//     myObj.open("GET", apiUrl, true);
//     myObj.send();
// }

// /*
// * ASTRO
// */
// function displayAstro() {
//     var myObj = new XMLHttpRequest();
//     var key = "43bc5e3833c44773809200820242506";
//     var apiUrl = "https://api.weatherapi.com/v1/forecast.json?q=Little%20Chute&days=1&key=" + key;

//     myObj.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             if (this.status == 200) {
//                 var response = JSON.parse(this.responseText);

//                 var astroData = response.forecast.forecastday[0].astro;
//                 var astroHTML = ``;

//                 var sunrise = astroData.sunrise;
//                 var sunset = astroData.sunset;
//                 var moonrise = astroData.moonrise;
//                 var moonset = astroData.moonset;

//                 astroHTML += `
//                     <div class="col-6">
//                         <div class="item">
//                             <p>Sunrise</p>
//                             <p>${sunrise}</p>
//                             <p>Sunset</p>
//                             <p>${sunset}</p>
//                         </div>
//                     </div>

//                     <div class="col-6">
//                         <div class="item">
//                             <p>Moonrise</p>
//                             <p>${moonrise}</p>
//                             <p>Moonset</p>
//                             <p>${moonset}</p>
//                         </div>
//                     </div>
                    
//                 `;

//                 // Append the constructed HTML to the element with id "hourly"
//                 document.getElementById("astro").innerHTML = astroHTML;
//             } else {
//                 console.log("Error: " + this.status + " - " + this.statusText);
//             }
//         }
//     };

//     myObj.open("GET", apiUrl, true);
//     myObj.send();
// }

// /*
// * More info
// */
// function displayMore() {
//     var myObj = new XMLHttpRequest();
//     var key = "43bc5e3833c44773809200820242506";
//     var apiUrl = "https://api.weatherapi.com/v1/current.json?q=Little%20Chute&key=" + key;

//     myObj.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             if (this.status == 200) {
//                 // Parse JSON response
//                 var response = JSON.parse(this.responseText);

//                 // Access elements of response object
//                 var windSpeed = response.current.wind_mph;
//                 var windDirection = response.current.wind_dir;
//                 var pressure = response.current.pressure_in;
//                 var humidity = response.current.humidity;
//                 var dewpoint = response.current.dewpoint_f;

//                 // Construct HTML to display
//                 var html = `
//                     <div class=" col-6">
//                         <div class="item">
//                             <p>Wind</p>
//                             <p>${windSpeed} mph (${windDirection})</p>
//                         </div>
//                     </div>

//                     <div class=" col-6">
//                         <div class="item">
//                             <p>Pressure</p>
//                             <p>${pressure} in</p>
//                         </div>
//                     </div>
                    
//                     <div class=" col-6">
//                         <div class="item">
//                             <p>Humidity</p>
//                             <p>${humidity}%</p>
//                         </div>
//                     </div>
                    
//                     <div class=" col-6">
//                         <div class="item">
//                             <p>Dew point</p>
//                             <p>${dewpoint}°</p>
//                         </div>
//                     </div>

//                 `;

//                 // Display in the HTML element with id "sample"
//                 document.getElementById("more").innerHTML = html;
//             } else {
//                 console.log("Error: " + this.status + " - " + this.statusText);
//             }
//         }
//     };

//     myObj.open("GET", apiUrl, true);
//     myObj.send();
// }