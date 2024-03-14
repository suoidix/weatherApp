//get page elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const weatherInfo = document.getElementById('weather-info');

searchButton.addEventListener('click', () => {
    const location = searchInput.value.trim();
    if (location) {
        getWeatherData(location);
    } else {
        weatherInfo.innerHTML = '<p>Please enter a location.</p>';
    }
});

function getWeatherData(location) {
    //this url will get location data based on (long,lat) must convert us ctiy/state to (long,lat) with another api**
    const apiURL = `https://api.weather.gov/gridpoints/LWX/${(location)}/forecast`;
    //headers to identify user of api
    const headers = new Headers({
        'Accept': 'application/vnd.noaa.dwml+json;version=1', //to use digital weather markup language 
        'User-Agent': 'suoidix@users.noreply.github.com' //to identify application and contact for NWS
    });

    fetch(apiURL, { headers })
        .then(response => response.json())
        .then(data => {
            // Parse and display weather data
            weatherInfo.innerHTML = ''; // empty the div
            if (data && data.properties && data.properties.periods && data.properties.periods.length > 0) {
                //set variable for 7 day forcast
                const forecasts = data.properties.periods;
                weatherInfo.innerHTML = '<h2>7-Day Forecast</h2>';
                forecasts.forEach(forecast => { // loop forcasts 
                    const dayForecast = document.createElement('div'); //create new div for each period
                    dayForecast.classList.add('day-forecast');
                    dayForecast.innerHTML = `
                        <h3>${forecast.name}</h3>
                        <p>Temperature: ${forecast.temperature}</p>
                        <p>Description: ${forecast.shortForecast}</p>
                    `;
                    weatherInfo.appendChild(dayForecast); //append to weatherinfo div
                });
            } else { //else if not found through NWS return unknown location
                weatherInfo.innerHTML = '<p>No weather information found for this location.</p>';
            }
        })//error handling for invalid search parameters - found on stackoverflow
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>Invalid entry.</p>';
        });
}