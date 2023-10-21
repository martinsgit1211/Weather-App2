function getWeather() {
    const location = document.getElementById('search-input').value;
    const apiKey = '9c02ef314b76977899fff3664f641e19';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data, location); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function displayWeather(data, location) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = '';

    const header = document.createElement('div');
    header.textContent = `${location}`;
    weatherContainer.appendChild(header);

    const forecast = data.list;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dailyForecasts = {};

    forecast.forEach(entry => {
        const date = new Date(entry.dt * 1000);
        const dayName = days[date.getDay()];
        const time = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`;
        const dateTime = `${dayName}, ${date.toDateString()} ${time}`;

        if (!dailyForecasts[dayName]) {
            dailyForecasts[dayName] = {
                temperature: entry.main.temp,
                description: entry.weather[0].description,
                humidity: entry.main.humidity,
                windSpeed: entry.wind.speed,
                icon: entry.weather[0].icon,
                dateTime: dateTime
            };
        }
    });

    Object.keys(dailyForecasts).forEach(dayName => {
        const { temperature, description, humidity, windSpeed, icon, dateTime } = dailyForecasts[dayName];
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');
        weatherCard.innerHTML = `
            <h2>${dayName}</h2>
            <p>${dateTime}</p>
            <img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}">
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
        weatherContainer.appendChild(weatherCard);
    });
}

