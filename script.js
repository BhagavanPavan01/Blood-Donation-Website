document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const locationBtn = document.querySelector('.location-btn');
    const searchResults = document.querySelector('.search-results');
    const settingsBtn = document.querySelector('.settings-btn');
    const settingsPanel = document.querySelector('.settings-panel');
    const saveSettingsBtn = document.querySelector('.save-settings');
    const tempUnitSelect = document.getElementById('temp-unit');
    const windUnitSelect = document.getElementById('wind-unit');
    const themeSelect = document.getElementById('theme');
    const weatherApp = document.querySelector('.weather-app');
    const backgroundContainer = document.querySelector('.background-container');
    
    // Current weather elements
    const locationName = document.querySelector('.location-name');
    const locationRegion = document.querySelector('.location-region');
    const currentDate = document.querySelector('.current-date');
    const weatherIcon = document.querySelector('.weather-icon i');
    const weatherTemp = document.querySelector('.temp');
    const weatherDesc = document.querySelector('.weather-desc');
    const windValue = document.querySelector('.detail-item:nth-child(1) .detail-value');
    const humidityValue = document.querySelector('.detail-item:nth-child(2) .detail-value');
    const precipValue = document.querySelector('.detail-item:nth-child(3) .detail-value');
    const visibilityValue = document.querySelector('.detail-item:nth-child(4) .detail-value');
    
    // Sample data for Vizianagaram
    const sampleData = {
        location: {
            name: "Vizianagaram",
            region: "Andhra Pradesh, India",
            lat: 18.1167,
            lon: 83.4167
        },
        current: {
            temp_c: 32,
            temp_f: 89.6,
            condition: {
                text: "Sunny",
                icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
            },
            wind_kph: 12,
            wind_mph: 7.5,
            humidity: 65,
            precip_mm: 0,
            precip_in: 0,
            vis_km: 10,
            vis_miles: 6,
            uv: 8,
            air_quality: {
                pm2_5: 78
            },
            is_day: 1
        },
        forecast: {
            forecastday: [
                {
                    date: "2025-08-18",
                    day: {
                        maxtemp_c: 35,
                        maxtemp_f: 95,
                        mintemp_c: 26,
                        mintemp_f: 78.8,
                        condition: {
                            text: "Sunny",
                            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
                        }
                    },
                    astro: {
                        sunrise: "06:12 AM",
                        sunset: "06:45 PM"
                    },
                    hour: [
                        { time: "2025-08-18 12:00", temp_c: 32, temp_f: 89.6, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" } },
                        { time: "2025-08-18 13:00", temp_c: 34, temp_f: 93.2, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" } },
                        { time: "2025-08-18 14:00", temp_c: 35, temp_f: 95, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" } },
                        { time: "2025-08-18 15:00", temp_c: 35, temp_f: 95, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" } },
                        { time: "2025-08-18 16:00", temp_c: 34, temp_f: 93.2, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" } },
                        { time: "2025-08-18 17:00", temp_c: 32, temp_f: 89.6, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" } },
                        { time: "2025-08-18 18:00", temp_c: 30, temp_f: 86, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" } }
                    ]
                },
                {
                    date: "2025-08-19",
                    day: {
                        maxtemp_c: 34,
                        maxtemp_f: 93.2,
                        mintemp_c: 26,
                        mintemp_f: 78.8,
                        condition: {
                            text: "Partly cloudy",
                            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
                        }
                    }
                },
                {
                    date: "2025-08-20",
                    day: {
                        maxtemp_c: 31,
                        maxtemp_f: 87.8,
                        mintemp_c: 25,
                        mintemp_f: 77,
                        condition: {
                            text: "Heavy rain",
                            icon: "//cdn.weatherapi.com/weather/64x64/day/308.png"
                        }
                    }
                },
                {
                    date: "2025-08-21",
                    day: {
                        maxtemp_c: 30,
                        maxtemp_f: 86,
                        mintemp_c: 25,
                        mintemp_f: 77,
                        condition: {
                            text: "Moderate rain",
                            icon: "//cdn.weatherapi.com/weather/64x64/day/302.png"
                        }
                    }
                },
                {
                    date: "2025-08-22",
                    day: {
                        maxtemp_c: 32,
                        maxtemp_f: 89.6,
                        mintemp_c: 26,
                        mintemp_f: 78.8,
                        condition: {
                            text: "Partly cloudy",
                            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
                        }
                    }
                },
                {
                    date: "2025-08-23",
                    day: {
                        maxtemp_c: 34,
                        maxtemp_f: 93.2,
                        mintemp_c: 27,
                        mintemp_f: 80.6,
                        condition: {
                            text: "Sunny",
                            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
                        }
                    }
                },
                {
                    date: "2025-08-24",
                    day: {
                        maxtemp_c: 35,
                        maxtemp_f: 95,
                        mintemp_c: 27,
                        mintemp_f: 80.6,
                        condition: {
                            text: "Sunny",
                            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
                        }
                    }
                }
            ]
        }
    };
    
    // App state
    let currentWeatherData = sampleData;
    let tempUnit = 'celsius';
    let windUnit = 'kmh';
    let theme = 'auto';
    
    // Initialize the app
    initApp();
    
    function initApp() {
        // Load settings from localStorage
        loadSettings();
        
        // Set initial weather data
        updateWeatherUI(currentWeatherData);
        
        // Set up event listeners
        setupEventListeners();
    }
    
    function loadSettings() {
        const savedTempUnit = localStorage.getItem('tempUnit');
        const savedWindUnit = localStorage.getItem('windUnit');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTempUnit) {
            tempUnit = savedTempUnit;
            tempUnitSelect.value = savedTempUnit;
        }
        
        if (savedWindUnit) {
            windUnit = savedWindUnit;
            windUnitSelect.value = savedWindUnit;
        }
        
        if (savedTheme) {
            theme = savedTheme;
            themeSelect.value = savedTheme;
            applyTheme(theme);
        }
    }
    
    function setupEventListeners() {
        // Search functionality
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Location button
        locationBtn.addEventListener('click', getCurrentLocationWeather);
        
        // Settings panel
        settingsBtn.addEventListener('click', toggleSettingsPanel);
        saveSettingsBtn.addEventListener('click', saveSettings);
        
        // Close settings when clicking outside
        document.addEventListener('click', function(e) {
            if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
                settingsPanel.classList.remove('active');
            }
        });
    }
    
    function handleSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // In a real app, you would call a weather API here
            // For this demo, we'll just use our sample data
            searchResults.innerHTML = `
                <div class="search-result-item" data-lat="18.1167" data-lon="83.4167">
                    <strong>Vizianagaram</strong>, Andhra Pradesh, India
                </div>
                <div class="search-result-item" data-lat="17.6868" data-lon="83.2185">
                    <strong>Visakhapatnam</strong>, Andhra Pradesh, India
                </div>
                <div class="search-result-item" data-lat="18.3000" data-lon="83.9000">
                    <strong>Srikakulam</strong>, Andhra Pradesh, India
                </div>
            `;
            searchResults.style.display = 'block';
            
            // Add click handlers to search results
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', function() {
                    const lat = this.getAttribute('data-lat');
                    const lon = this.getAttribute('data-lon');
                    // In a real app, you would fetch weather for this location
                    // For demo, we'll just update the location name
                    locationName.textContent = this.textContent.split(',')[0].trim();
                    locationRegion.textContent = this.textContent.split(',').slice(1).join(',').trim();
                    searchResults.style.display = 'none';
                    
                    // Update weather condition based on location (demo only)
                    if (locationName.textContent.includes('Visakhapatnam')) {
                        updateWeatherCondition('Partly cloudy', 30, 1);
                    } else if (locationName.textContent.includes('Srikakulam')) {
                        updateWeatherCondition('Rain', 28, 0.6);
                    } else {
                        updateWeatherCondition('Sunny', 32, 0);
                    }
                });
            });
        }
    }
    
    function getCurrentLocationWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    // In a real app, you would fetch weather for this location
                    // For demo, we'll just show a message
                    locationName.textContent = "Your Location";
                    locationRegion.textContent = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
                    updateWeatherCondition('Sunny', 30, 0);
                },
                error => {
                    alert("Unable to retrieve your location. Please check your browser settings.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }
    
    function toggleSettingsPanel() {
        settingsPanel.classList.toggle('active');
    }
    
    function saveSettings() {
        tempUnit = tempUnitSelect.value;
        windUnit = windUnitSelect.value;
        theme = themeSelect.value;
        
        // Save to localStorage
        localStorage.setItem('tempUnit', tempUnit);
        localStorage.setItem('windUnit', windUnit);
        localStorage.setItem('theme', theme);
        
        // Apply changes
        updateWeatherUI(currentWeatherData);
        applyTheme(theme);
        
        // Close settings panel
        settingsPanel.classList.remove('active');
    }
    
    function applyTheme(selectedTheme) {
        if (selectedTheme === 'auto') {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            weatherApp.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            
            // Listen for changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                weatherApp.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            });
        } else {
            weatherApp.setAttribute('data-theme', selectedTheme);
        }
    }
    
    function updateWeatherUI(data) {
        // Update location info
        locationName.textContent = data.location.name;
        locationRegion.textContent = data.location.region;
        
        // Update current date
        updateCurrentDate();
        
        // Update current weather
        const current = data.current;
        weatherDesc.textContent = current.condition.text;
        
        // Set temperature based on selected unit
        if (tempUnit === 'celsius') {
            weatherTemp.textContent = Math.round(current.temp_c);
        } else {
            weatherTemp.textContent = Math.round(current.temp_f);
        }
        
        // Set wind speed based on selected unit
        if (windUnit === 'kmh') {
            windValue.textContent = `${current.wind_kph} km/h`;
        } else if (windUnit === 'mph') {
            windValue.textContent = `${current.wind_mph} mph`;
        } else {
            windValue.textContent = `${(current.wind_kph / 3.6).toFixed(1)} m/s`;
        }
        
        humidityValue.textContent = `${current.humidity}%`;
        precipValue.textContent = `${current.precip_mm}%`;
        visibilityValue.textContent = `${current.vis_km} km`;
        
        // Update weather icon
        updateWeatherIcon(current.condition.text, current.is_day);
        
        // Update background based on weather condition
        updateWeatherBackground(current.condition.text, current.is_day);
        
        // Update hourly forecast
        updateHourlyForecast(data.forecast.forecastday[0].hour);
        
        // Update daily forecast
        updateDailyForecast(data.forecast.forecastday);
        
        // Update additional info
        updateAdditionalInfo(data);
    }
    
    function updateCurrentDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDate.textContent = now.toLocaleDateString('en-US', options);
    }
    
    function updateWeatherIcon(condition, isDay) {
        // Reset all weather condition classes
        backgroundContainer.className = 'background-container';
        
        // Add appropriate weather class
        const conditionClass = getConditionClass(condition, isDay);
        backgroundContainer.classList.add(conditionClass);
        
        // Set icon based on condition
        let iconClass = 'fas fa-question';
        
        if (condition.toLowerCase().includes('sunny') || condition.toLowerCase().includes('clear')) {
            iconClass = isDay ? 'fas fa-sun' : 'fas fa-moon';
        } else if (condition.toLowerCase().includes('cloud')) {
            iconClass = isDay ? 'fas fa-cloud-sun' : 'fas fa-cloud-moon';
        } else if (condition.toLowerCase().includes('rain')) {
            iconClass = 'fas fa-cloud-rain';
        } else if (condition.toLowerCase().includes('snow')) {
            iconClass = 'fas fa-snowflake';
        } else if (condition.toLowerCase().includes('thunder') || condition.toLowerCase().includes('storm')) {
            iconClass = 'fas fa-bolt';
        } else if (condition.toLowerCase().includes('fog') || condition.toLowerCase().includes('mist')) {
            iconClass = 'fas fa-smog';
        }
        
        weatherIcon.className = iconClass;
    }
    
    function getConditionClass(condition, isDay) {
        condition = condition.toLowerCase();
        
        if (!isDay) return 'night';
        if (condition.includes('sunny') || condition.includes('clear')) return 'clear';
        if (condition.includes('cloud')) return 'cloudy';
        if (condition.includes('rain')) return 'rainy';
        if (condition.includes('snow')) return 'snowy';
        if (condition.includes('thunder') || condition.includes('storm')) return 'thunderstorm';
        if (condition.includes('fog') || condition.includes('mist')) return 'foggy';
        
        return 'clear';
    }
    
    function updateWeatherBackground(condition, isDay) {
        // This is handled by the CSS classes added in updateWeatherIcon
    }
    
    function updateHourlyForecast(hourlyData) {
        const hourlyContainer = document.querySelector('.hourly-container');
        hourlyContainer.innerHTML = '';
        
        const now = new Date();
        const currentHour = now.getHours();
        
        // Show current hour plus next 6 hours
        for (let i = 0; i < 7; i++) {
            const hourIndex = (currentHour + i) % 24;
            const hourData = hourlyData[hourIndex] || hourlyData[0]; // Fallback to first hour if needed
            
            const hourItem = document.createElement('div');
            hourItem.className = 'hourly-item';
            
            const hourLabel = i === 0 ? 'Now' : `${hourIndex % 12 === 0 ? 12 : hourIndex % 12} ${hourIndex < 12 ? 'AM' : 'PM'}`;
            
            // Get icon class based on condition
            let iconClass = 'fas fa-question';
            if (hourData.condition.text.toLowerCase().includes('sunny') || hourData.condition.text.toLowerCase().includes('clear')) {
                iconClass = hourIndex >= 6 && hourIndex < 18 ? 'fas fa-sun' : 'fas fa-moon';
            } else if (hourData.condition.text.toLowerCase().includes('cloud')) {
                iconClass = hourIndex >= 6 && hourIndex < 18 ? 'fas fa-cloud-sun' : 'fas fa-cloud-moon';
            } else if (hourData.condition.text.toLowerCase().includes('rain')) {
                iconClass = 'fas fa-cloud-rain';
            } else if (hourData.condition.text.toLowerCase().includes('snow')) {
                iconClass = 'fas fa-snowflake';
            } else if (hourData.condition.text.toLowerCase().includes('thunder') || hourData.condition.text.toLowerCase().includes('storm')) {
                iconClass = 'fas fa-bolt';
            } else if (hourData.condition.text.toLowerCase().includes('fog') || hourData.condition.text.toLowerCase().includes('mist')) {
                iconClass = 'fas fa-smog';
            }
            
            const temp = tempUnit === 'celsius' ? Math.round(hourData.temp_c) : Math.round(hourData.temp_f);
            
            hourItem.innerHTML = `
                <div class="hour">${hourLabel}</div>
                <div class="hour-icon"><i class="${iconClass}"></i></div>
                <div class="hour-temp">${temp}°</div>
            `;
            
            hourlyContainer.appendChild(hourItem);
        }
    }
    
    function updateDailyForecast(dailyData) {
        const dailyContainer = document.querySelector('.daily-container');
        dailyContainer.innerHTML = '';
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        
        dailyData.forEach((dayData, index) => {
            const date = new Date(dayData.date);
            const dayName = index === 0 ? 'Today' : days[date.getDay()];
            
            // Get icon class based on condition
            let iconClass = 'fas fa-question';
            if (dayData.day.condition.text.toLowerCase().includes('sunny') || dayData.day.condition.text.toLowerCase().includes('clear')) {
                iconClass = 'fas fa-sun';
            } else if (dayData.day.condition.text.toLowerCase().includes('cloud')) {
                iconClass = 'fas fa-cloud';
            } else if (dayData.day.condition.text.toLowerCase().includes('rain')) {
                iconClass = 'fas fa-cloud-rain';
            } else if (dayData.day.condition.text.toLowerCase().includes('snow')) {
                iconClass = 'fas fa-snowflake';
            } else if (dayData.day.condition.text.toLowerCase().includes('thunder') || dayData.day.condition.text.toLowerCase().includes('storm')) {
                iconClass = 'fas fa-bolt';
            } else if (dayData.day.condition.text.toLowerCase().includes('fog') || dayData.day.condition.text.toLowerCase().includes('mist')) {
                iconClass = 'fas fa-smog';
            }
            
            const maxTemp = tempUnit === 'celsius' ? Math.round(dayData.day.maxtemp_c) : Math.round(dayData.day.maxtemp_f);
            const minTemp = tempUnit === 'celsius' ? Math.round(dayData.day.mintemp_c) : Math.round(dayData.day.mintemp_f);
            
            const dayItem = document.createElement('div');
            dayItem.className = 'daily-item';
            dayItem.innerHTML = `
                <div class="day">${dayName}</div>
                <div class="day-icon"><i class="${iconClass}"></i></div>
                <div class="day-temp">
                    <span class="max-temp">${maxTemp}°</span>
                    <span class="min-temp">${minTemp}°</span>
                </div>
            `;
            
            dailyContainer.appendChild(dayItem);
        });
    }
    
    function updateAdditionalInfo(data) {
        // Update sunrise/sunset
        const sunriseEl = document.querySelector('.sun-time:nth-child(1) span');
        const sunsetEl = document.querySelector('.sun-time:nth-child(2) span');
        
        if (data.forecast.forecastday[0].astro) {
            sunriseEl.textContent = data.forecast.forecastday[0].astro.sunrise;
            sunsetEl.textContent = data.forecast.forecastday[0].astro.sunset;
        }
        
        // Update air quality
        const aqiEl = document.querySelector('.air-quality-index');
        const aqiDescEl = document.querySelector('.air-quality-desc');
        
        if (data.current.air_quality && data.current.air_quality.pm2_5) {
            const aqi = data.current.air_quality.pm2_5;
            aqiEl.textContent = aqi;
            
            // Set color based on AQI
            if (aqi <= 50) {
                aqiEl.style.color = '#27ae60'; // Good
                aqiDescEl.textContent = 'Good';
            } else if (aqi <= 100) {
                aqiEl.style.color = '#f39c12'; // Moderate
                aqiDescEl.textContent = 'Moderate';
            } else if (aqi <= 150) {
                aqiEl.style.color = '#e74c3c'; // Unhealthy for sensitive
                aqiDescEl.textContent = 'Unhealthy for Sensitive Groups';
            } else if (aqi <= 200) {
                aqiEl.style.color = '#9b59b6'; // Unhealthy
                aqiDescEl.textContent = 'Unhealthy';
            } else if (aqi <= 300) {
                aqiEl.style.color = '#e74c3c'; // Very unhealthy
                aqiDescEl.textContent = 'Very Unhealthy';
            } else {
                aqiEl.style.color = '#c0392b'; // Hazardous
                aqiDescEl.textContent = 'Hazardous';
            }
        }
        
        // Update UV index
        const uvEl = document.querySelector('.uv-index');
        const uvDescEl = document.querySelector('.uv-desc');
        
        if (data.current.uv) {
            const uv = data.current.uv;
            uvEl.textContent = uv;
            
            // Set color based on UV index
            if (uv <= 2) {
                uvEl.style.color = '#27ae60'; // Low
                uvDescEl.textContent = 'Low';
            } else if (uv <= 5) {
                uvEl.style.color = '#f1c40f'; // Moderate
                uvDescEl.textContent = 'Moderate';
            } else if (uv <= 7) {
                uvEl.style.color = '#f39c12'; // High
                uvDescEl.textContent = 'High';
            } else if (uv <= 10) {
                uvEl.style.color = '#e74c3c'; // Very high
                uvDescEl.textContent = 'Very High';
            } else {
                uvEl.style.color = '#9b59b6'; // Extreme
                uvDescEl.textContent = 'Extreme';
            }
        }
    }
    
    // Demo function to update weather condition
    function updateWeatherCondition(condition, temp, precip) {
        const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18;
        
        weatherDesc.textContent = condition;
        weatherTemp.textContent = temp;
        precipValue.textContent = `${Math.round(precip * 100)}%`;
        
        // Update icon and background
        updateWeatherIcon(condition, isDay ? 1 : 0);
        
        // Update hourly forecast with new condition
        const hourlyContainer = document.querySelector('.hourly-container');
        const hourlyItems = hourlyContainer.querySelectorAll('.hourly-item');
        
        hourlyItems.forEach((item, index) => {
            const tempChange = index * 2 - 3; // Vary temperature slightly
            const newTemp = Math.max(temp + tempChange, temp - 5);
            item.querySelector('.hour-temp').textContent = `${newTemp}°`;
            
            // Update icon based on condition
            const icon = item.querySelector('.hour-icon i');
            if (condition.toLowerCase().includes('sunny') || condition.toLowerCase().includes('clear')) {
                icon.className = isDay ? 'fas fa-sun' : 'fas fa-moon';
            } else if (condition.toLowerCase().includes('cloud')) {
                icon.className = isDay ? 'fas fa-cloud-sun' : 'fas fa-cloud-moon';
            } else if (condition.toLowerCase().includes('rain')) {
                icon.className = 'fas fa-cloud-rain';
            } else if (condition.toLowerCase().includes('snow')) {
                icon.className = 'fas fa-snowflake';
            } else if (condition.toLowerCase().includes('thunder') || condition.toLowerCase().includes('storm')) {
                icon.className = 'fas fa-bolt';
            } else if (condition.toLowerCase().includes('fog') || condition.toLowerCase().includes('mist')) {
                icon.className = 'fas fa-smog';
            }
        });
    }
    
    // Demo: Simulate weather change after 10 seconds
    setTimeout(() => {
        updateWeatherCondition('Partly cloudy', 30, 0.2);
    }, 10000);
    
    // Demo: Simulate rain after 20 seconds
    setTimeout(() => {
        updateWeatherCondition('Moderate rain', 28, 0.6);
    }, 20000);
    
    // Demo: Reset to sunny after 30 seconds
    setTimeout(() => {
        updateWeatherCondition('Sunny', 32, 0);
    }, 30000);
});