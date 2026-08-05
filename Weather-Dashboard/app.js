const API_KEY = "6efca1fbc6516f7be1d7b1d61ac8f659";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// DOM Elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const locationButton = document.getElementById("location-btn");
const toggleButton = document.getElementById("toggle-temp");
const forecastContainer = document.getElementById("forecast-container");

// Elements to update
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

let isCelsius = true;

let currentWeather;

async function getWeather(city) {

    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    
    try {

        showLoading();

        hideError();
        
        const response = await fetch(url);
        
        if (!response.ok) {

            if (response.status === 404) {

                throw new Error("City not found");
            }

            throw new Error("Failed to fetch weather data");
        }
        
        const data = await response.json();

        currentWeather = data;

        getForecast(city);

        displayWeather(data);

        saveToHistory(city);
        
    } catch (err) {

        showError(err.message);

    } finally {

        hideLoading();

    }
}


async function getForecast(city) {

    const url = `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Unable to fetch forecast");

        }


        const data = await response.json();

        displayForecast(data);


    } catch(error) {

        showError(error.message);

    }

}

function changeBackground(weather) {


    if(weather.includes("rain")) {

        document.body.style.backgroundImage =

        "url('rain.jpg')";


    } else if(weather.includes("cloud")) {

        document.body.style.backgroundImage =

        "url('cloud.jpg')";


    } else if(weather.includes("clear")) {

        document.body.style.backgroundImage =

        "url('sunny.jpg')";


    }

}

function getLocationWeather() {

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const lat = position.coords.latitude;

            const lon = position.coords.longitude;


            getWeatherByLocation(lat, lon);

        },

        function() {

            showError("Unable to get your location");

        }

  );

}

function displayWeather(data) {

    cityName.textContent = `${data.name}, ${data.sys.country}`;

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.alt = data.weather[0].description;

    if (isCelsius) {

    temperature.textContent = `${data.main.temp} °C`;

} else {

    const fahrenheit = (data.main.temp * 9/5) + 32;

    temperature.textContent = `${fahrenheit.toFixed(1)} °F`;

   }

}

function displayForecast(data) {

    forecastContainer.innerHTML = "";


    const forecast = data.list.filter((item, index) => index % 8 === 0);

    
    forecast.forEach(day => {


        forecastContainer.innerHTML += `

            <div class="forecast-card">

                <h3>${day.dt_txt}</h3>

                <p>
                    ${day.main.temp} °C
                </p>

                <p>
                    ${day.weather[0].description}
                </p>

            </div>

        `;
    });

    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${data.main.feels_like} °C`;

    humidity.textContent = `${data.main.humidity}%`;

    wind.textContent = `${data.wind.speed} m/s`;

    pressure.textContent = `${data.main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");
}

function showLoading() {

    loading.classList.remove("hidden");

    weatherDisplay.classList.add("hidden");
}

function hideLoading() {

    loading.classList.add("hidden");

}

function showError(message) {

    error.textContent = message;

    error.classList.remove("hidden");

}

function hideError() {

    error.classList.add("hidden");
}

function saveToHistory(city) {

    let history = JSON.parse(localStorage.getItem("cities")) || [];

    history = history.filter(item => item !== city);

    history.unshift(city);

    history = history.slice(0, 5);

    localStorage.setItem("cities", JSON.stringify(history));

}

function loadHistory() {

    const history = JSON.parse(localStorage.getItem("cities")) || [];

    const searchHistory = document.getElementById("search-history");

    searchHistory.innerHTML = history.map(city => `

        <li>${city}</li>

    `).join("");


}

document.getElementById("search-history")

.addEventListener("click", function(event) {

    if (event.target.tagName === "LI") {

        getWeather(event.target.textContent);

    }

});

// Event Listeners

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const city = cityInput.value.trim();

    if (city) {

        getWeather(city);
    }

});


    locationButton.addEventListener("click", function() {

    getLocationWeather();

});



async function getWeatherByLocation(lat, lon) {

    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {

        showLoading();

        hideError();

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Unable to fetch location weather");

        }


        const data = await response.json();

        displayWeather(data);

    } catch(error) {

        showError(error.message);

    } finally {

        hideLoading();

    }

}

toggleButton.addEventListener("click", function(){

    isCelsius = !isCelsius;


    if(currentWeather){

        displayWeather(currentWeather);

    }

    if(isCelsius){

        toggleButton.textContent = "Switch to Fahrenheit";

    } else {

        toggleButton.textContent = "Switch to Celsius";

    }

});


// Initialize

loadHistory();