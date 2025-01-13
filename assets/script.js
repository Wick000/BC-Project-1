const apiKey = 'b189d7005e52d97021e45dd94dd266ea'; // Replace with your OpenWeatherMap API key
let city = 'Monson'; // Predefined city and state (e.g., 'Miami, FL') for default weather
const units = 'imperial'; // Use 'imperial' for Fahrenheit or 'metric' for Celsius

const weatherContainer = document.querySelector('.weather-container');
const cityName = document.getElementById('city-name');
const lastUpdated = document.getElementById('last-updated');
const tempValue = document.getElementById('temp-value');
const tempDescription = document.getElementById('temp-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Function to fetch weather data from OpenWeatherMap API
function fetchWeather(cityState) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityState}&units=${units}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Extract necessary data
                const weatherData = data.weather[0];
                const mainData = data.main;
                const windData = data.wind;

                // Update the page with weather data
                cityName.textContent = `${data.name}, ${data.sys.country}`;
                lastUpdated.textContent = `Updated: ${new Date().toLocaleString()}`;
                tempValue.textContent = `${mainData.temp}°F`;
                tempDescription.textContent = weatherData.description;
                humidity.textContent = `Humidity: ${mainData.humidity}%`;
                windSpeed.textContent = `Wind: ${windData.speed} MPH`;
            } else {
                // Handle errors (e.g., city not found)
                cityName.textContent = 'City not found';
                lastUpdated.textContent = '';
                tempValue.textContent = '--';
                tempDescription.textContent = 'Error fetching data';
                humidity.textContent = 'Humidity: --';
                windSpeed.textContent = 'Wind: --';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            cityName.textContent = 'Error';
            lastUpdated.textContent = '';
            tempValue.textContent = '--';
            tempDescription.textContent = 'Error fetching data';
            humidity.textContent = 'Humidity: --';
            windSpeed.textContent = 'Wind: --';
        });
}

// Fetch weather for predefined city (default on page load)
fetchWeather(city);

// Handle the search button click
searchBtn.addEventListener('click', function() {
    const cityState = searchInput.value.trim();

    if (cityState) {
        // Update the city variable with user input and fetch new weather data
        city = cityState; // Store the new city and state
        fetchWeather(city);
    } else {
        alert('Please enter a city and state.');
    }
});

// Optional: Allow pressing "Enter" to search as well
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});