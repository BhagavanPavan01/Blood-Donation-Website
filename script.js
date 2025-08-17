// DOM Elements
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const currentTemp = document.getElementById('current-temp');
const tempUnits = document.querySelectorAll('.temp-unit span');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const visibility = document.getElementById('visibility');
const forecastCards = document.getElementById('forecast-cards');
const hourlyScroll = document.getElementById('hourly-scroll');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const uvValue = document.getElementById('uv-value');
const uvText = document.getElementById('uv-text');
const pressure = document.getElementById('pressure');

// Weather Elements
const weatherApp = document.querySelector('.weather-app');
const weatherBackground = document.querySelector('.weather-background');
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');
const clouds = document.querySelector('.clouds');
const rain = document.querySelector('.rain');
const snow = document.querySelector('.snow');
const stars = document.querySelector('.stars');
const lightning = document.querySelector('.lightning');
const fog = document.querySelector('.fog');

// API Key and Base URL
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Current unit (Celsius by default)
let currentUnit = 'metric';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    updateCurrentDate();
    
    // Get user's current location weather
    getLocationWeather();
    
    // Set up event listeners
    searchBtn.addEventListener('click', searchLocation);
    locationBtn.addEventListener('click', getLocationWeather);
    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchLocation();
        }
    });
    
    // Temperature unit toggle
    tempUnits.forEach(unit => {
        unit.addEventListener('click', () => {
            if (!unit.classList.contains('active')) {
                tempUnits.forEach(u => u.classList.remove('active'));
                unit.classList.add('active');
                currentUnit = unit.textContent === '°C' ? 'metric' : 'imperial';
                // Refresh weather data with new unit
                const currentCity = cityName.textContent;
                getWeatherData(currentCity);
            }
        });
    });
});

// Update current date
function updateCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
}

// Search for a location
function searchLocation() {
    const location = locationInput.value.trim();
    if (location) {
        getWeatherData(location);
        locationInput.value = '';
    }
}

// Get weather for user's current location
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            error => {
                console.error('Error getting location:', error);
                // Default to a city if location access is denied
                getWeatherData('Visakhapatnam');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
        getWeatherData('Visakhapatnam');
    }
}

// Get weather data by city name
async function getWeatherData(city) {
    try {
        // Current weather
        const currentResponse = await fetch(
            `${BASE_URL}/weather?q=${city}&units=${currentUnit}&appid=${API_KEY}`
        );
        
        if (!currentResponse.ok) {
            throw new Error('City not found');
        }
        
        const currentData = await currentResponse.json();
        
        // Forecast (5 day / 3 hour)
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=${currentUnit}&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();
        
        // Update UI with weather data
        updateCurrentWeather(currentData);
        updateForecast(forecastData);
        updateHourlyForecast(forecastData);
        
        // Update weather visuals
        updateWeatherVisuals(currentData.weather[0].main, currentData.dt, currentData.sys.sunrise, currentData.sys.sunset);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try another location.');
    }
}

// Get weather data by coordinates
async function getWeatherByCoords(lat, lon) {
    try {
        // Current weather
        const currentResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${currentUnit}&appid=${API_KEY}`
        );
        const currentData = await currentResponse.json();
        
        // Forecast (5 day / 3 hour)
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${currentUnit}&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();
        
        // Update UI with weather data
        updateCurrentWeather(currentData);
        updateForecast(forecastData);
        updateHourlyForecast(forecastData);
        
        // Update weather visuals
        updateWeatherVisuals(currentData.weather[0].main, currentData.dt, currentData.sys.sunrise, currentData.sys.sunset);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Update current weather display
function updateCurrentWeather(data) {
    cityName.textContent = data.name;
    
    const temp = Math.round(data.main.temp);
    currentTemp.textContent = temp;
    
    const feelsLikeTemp = Math.round(data.main.feels_like);
    feelsLike.textContent = `Feels like: ${feelsLikeTemp}°`;
    
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    
    const windSpeed = currentUnit === 'metric' 
        ? `${Math.round(data.wind.speed * 3.6)} km/h` 
        : `${Math.round(data.wind.speed)} mph`;
    wind.textContent = `Wind: ${windSpeed}`;
    
    const visibilityDist = currentUnit === 'metric' 
        ? `${data.visibility / 1000} km` 
        : `${(data.visibility / 1000 * 0.621371).toFixed(1)} mi`;
    visibility.textContent = `Visibility: ${visibilityDist}`;
    
    weatherDescription.textContent = data.weather[0].description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    // Update weather icon
    updateWeatherIcon(data.weather[0].icon, weatherIcon);
    
    // Update sunrise/sunset times
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunrise.textContent = sunriseTime;
    sunset.textContent = sunsetTime;
    
    // Update UV index (not available in basic API, would need UV index API)
    uvValue.textContent = '--';
    uvText.textContent = '(---)';
    
    // Update pressure
    pressure.textContent = `${data.main.pressure} hPa`;
}

// Update 5-day forecast
function updateForecast(data) {
    // Clear previous forecast cards
    forecastCards.innerHTML = '';
    
    // We'll get one forecast per day (around midday)
    const dailyForecasts = [];
    const daysProcessed = new Set();
    
    for (const forecast of data.list) {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        // Only take one forecast per day (around 12:00 PM)
        if (date.getHours() >= 12 && date.getHours() <= 14 && !daysProcessed.has(day)) {
            daysProcessed.add(day);
            dailyForecasts.push(forecast);
            
            if (dailyForecasts.length === 5) break;
        }
    }
    
    // Create forecast cards
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const tempMax = Math.round(forecast.main.temp_max);
        const tempMin = Math.round(forecast.main.temp_min);
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-day">${day}</div>
            <div class="forecast-icon">
                <i class="${getWeatherIconClass(forecast.weather[0].icon)}"></i>
            </div>
            <div class="forecast-temp">
                <span>${tempMax}°</span>
                <span>${tempMin}°</span>
            </div>
        `;
        
        forecastCards.appendChild(card);
    });
}

// Update hourly forecast
function updateHourlyForecast(data) {
    // Clear previous hourly items
    hourlyScroll.innerHTML = '';
    
    // Get next 24 hours of forecasts (3-hour intervals)
    const hourlyForecasts = data.list.slice(0, 8); // Next 24 hours (8 * 3-hour intervals)
    
    hourlyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const time = date.toLocaleTimeString([], { hour: '2-digit' });
        const temp = Math.round(forecast.main.temp);
        
        const item = document.createElement('div');
        item.className = 'hourly-item';
        item.innerHTML = `
            <div class="hourly-time">${time}</div>
            <div class="hourly-icon">
                <i class="${getWeatherIconClass(forecast.weather[0].icon)}"></i>
            </div>
            <div class="hourly-temp">${temp}°</div>
        `;
        
        hourlyScroll.appendChild(item);
    });
}

// Update weather icon based on OpenWeatherMap icon code
function updateWeatherIcon(iconCode, element) {
    const iconClass = getWeatherIconClass(iconCode);
    element.innerHTML = `<i class="${iconClass}"></i>`;
}

// Map OpenWeatherMap icon codes to Font Awesome classes
function getWeatherIconClass(iconCode) {
    const iconMap = {
        '01d': 'fas fa-sun',           // clear sky (day)
        '01n': 'fas fa-moon',          // clear sky (night)
        '02d': 'fas fa-cloud-sun',     // few clouds (day)
        '02n': 'fas fa-cloud-moon',    // few clouds (night)
        '03d': 'fas fa-cloud',         // scattered clouds
        '03n': 'fas fa-cloud',
        '04d': 'fas fa-cloud',         // broken clouds
        '04n': 'fas fa-cloud',
        '09d': 'fas fa-cloud-rain',   // shower rain
        '09n': 'fas fa-cloud-rain',
        '10d': 'fas fa-cloud-sun-rain', // rain (day)
        '10n': 'fas fa-cloud-moon-rain', // rain (night)
        '11d': 'fas fa-bolt',          // thunderstorm
        '11n': 'fas fa-bolt',
        '13d': 'far fa-snowflake',     // snow
        '13n': 'far fa-snowflake',
        '50d': 'fas fa-smog',          // mist
        '50n': 'fas fa-smog'
    };
    
    return iconMap[iconCode] || 'fas fa-question';
}

// Update weather visuals based on conditions and time
function updateWeatherVisuals(weatherCondition, currentTime, sunriseTime, sunsetTime) {
    // Reset all weather classes
    weatherApp.className = 'weather-app';
    
    // Determine if it's day or night
    const isDaytime = currentTime > sunriseTime && currentTime < sunsetTime;
    
    // Set day/night class
    if (isDaytime) {
        weatherApp.classList.add('day');
    } else {
        weatherApp.classList.add('night');
    }
    
    // Set weather condition class
    const condition = weatherCondition.toLowerCase();
    if (condition.includes('rain') || condition.includes('drizzle')) {
        weatherApp.classList.add('rainy');
    } else if (condition.includes('snow')) {
        weatherApp.classList.add('snowy');
    } else if (condition.includes('thunder')) {
        weatherApp.classList.add('thunder');
    } else if (condition.includes('fog') || condition.includes('mist') || condition.includes('haze')) {
        weatherApp.classList.add('foggy');
    }
    
    // Special case for clear night with stars
    if (!isDaytime && condition.includes('clear')) {
        stars.style.opacity = '0.8';
    }
}