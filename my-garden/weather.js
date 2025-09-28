// OpenWeatherMap API configuration
const API_KEY = '04e39c3eadec9e842e4f2c2a45b9dc96'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get user's location and fetch weather data
async function getWeatherData() {
    try {
        // Get user's location
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        // Fetch current weather
        const currentWeather = await fetchCurrentWeather(latitude, longitude);
        updateCurrentWeather(currentWeather);

        // Fetch 5-day forecast
        const forecast = await fetchWeatherForecast(latitude, longitude);
        updateWeatherForecast(forecast);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showWeatherError();
    }
}

// Get current position
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
        }
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Fetch current weather
async function fetchCurrentWeather(lat, lon) {
    const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Weather data fetch failed');
    return await response.json();
}

// Fetch 5-day forecast
async function fetchWeatherForecast(lat, lon) {
    const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Forecast data fetch failed');
    return await response.json();
}

// Update current weather display
function updateCurrentWeather(data) {
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherCondition = document.querySelector('.weather-info h3');
    const temperature = document.querySelector('.temperature');
    const location = document.querySelector('.location');
    const windSpeed = document.querySelector('.detail:nth-child(1) span');
    const humidity = document.querySelector('.detail:nth-child(2) span');
    const rainChance = document.querySelector('.detail:nth-child(3) span');

    // Update weather icon
    weatherIcon.className = `fas ${getWeatherIcon(data.weather[0].id)} weather-icon`;

    // Update weather information
    weatherCondition.textContent = data.weather[0].main;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    location.textContent = `${data.name}, ${data.sys.country}`;
    windSpeed.textContent = `Wind: ${Math.round(data.wind.speed * 3.6)} km/h`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    rainChance.textContent = `Rain: ${data.rain ? Math.round(data.rain['1h'] * 100) : 0}%`;
}

// Update weather forecast display
function updateWeatherForecast(data) {
    const forecastGrid = document.querySelector('.forecast-grid');
    forecastGrid.innerHTML = '';

    // Get one forecast per day (excluding today)
    const dailyForecasts = data.list.filter(forecast => 
        forecast.dt_txt.includes('12:00:00')
    ).slice(0, 5);

    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <h4>${dayName}</h4>
            <i class="fas ${getWeatherIcon(forecast.weather[0].id)}"></i>
            <p>${Math.round(forecast.main.temp)}°C</p>
        `;
        
        forecastGrid.appendChild(forecastDay);
    });
}

// Get appropriate weather icon
function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return 'fa-bolt'; // Thunderstorm
    if (weatherId >= 300 && weatherId < 400) return 'fa-cloud-rain'; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return 'fa-cloud-showers-heavy'; // Rain
    if (weatherId >= 600 && weatherId < 700) return 'fa-snowflake'; // Snow
    if (weatherId >= 700 && weatherId < 800) return 'fa-smog'; // Atmosphere
    if (weatherId === 800) return 'fa-sun'; // Clear
    if (weatherId > 800) return 'fa-cloud'; // Clouds
    return 'fa-cloud'; // Default
}

// Show error message
function showWeatherError() {
    const weatherContainer = document.querySelector('.weather-container');
    weatherContainer.innerHTML = `
        <div class="weather-error">
            <i class="fas fa-exclamation-circle"></i>
            <p>Unable to fetch weather data. Please try again later.</p>
        </div>
    `;
}

// Initialize weather data
document.addEventListener('DOMContentLoaded', getWeatherData);

export { getWeatherData }; 