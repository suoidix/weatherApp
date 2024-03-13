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

getWeatherData();