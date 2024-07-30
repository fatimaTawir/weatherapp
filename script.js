
const apiKey = '673079df600a38f8c949a91390672ff1'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Map of cities to background images
const cityBackgrounds = {
    'New York': 'images/new york.jpg',
    'London': 'images/london.jpg',
    'Paris': 'images/paris.jpg',
    'Tokyo': 'images/tokyo.jpg',
    'Juba': 'images/juba.jpg',
    'Nairobi': 'images/nairobi.jpg',
    'Dilling': 'images/dilling.jpg',
    'Khartoum': 'images/khartoum.jpg',
    'Cairo': 'images/cairo.jpg',
    'Lagos': 'images/lagos.jpg',
    'Johannesburg': 'images/johannesburg.jpg',
    'Cape Town': 'images/cape-town.jpg'
};

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    } else {
        alert('Please enter a city name');
    }
});

async function fetchWeather(city) {
    try {
        toggleSpinner(true);
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
        changeBackground(city); // Change the background image
    } catch (error) {
        alert(error.message);
    } finally {
        toggleSpinner(false);
    }
}

async function fetchForecast(city) {
    try {
        const response = await fetch(`${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

function displayForecast(data) {
    const forecastDisplay = document.getElementById('forecast-display');
    forecastDisplay.innerHTML = '<h2>5-Day Forecast</h2>';
    data.list.slice(0, 5).forEach(item => {
        const date = new Date(item.dt * 1000);
        forecastDisplay.innerHTML += `
            <p>${date.toDateString()}: ${item.main.temp}°C, ${item.weather[0].description}</p>
        `;
    });
}

function toggleSpinner(show) {
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.toggle('hidden', !show);
}

function changeBackground(city) {
    const body = document.body;
    const backgroundUrl = cityBackgrounds[city] || 'images/pexels-default.jpg'; // Default background

    // Debugging
    console.log(`City: ${city}`);
    console.log(`Background URL: ${backgroundUrl}`);

    body.style.backgroundImage = `url('${backgroundUrl}')`;

    // Check if the image is actually being loaded
    const img = new Image();
    img.src = backgroundUrl;
    img.onload = () => console.log(`Image loaded: ${backgroundUrl}`);
    img.onerror = () => console.error(`Image failed to load: ${backgroundUrl}`);
}
