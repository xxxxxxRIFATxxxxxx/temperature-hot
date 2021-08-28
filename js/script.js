// Define UI Element
const spinner = document.getElementById("spinner-container");
const alert = document.querySelector(".alert");

// For API
const apiKey = 'b9246b677036b172b92d4786f0584e1e';
const apiBase = 'https://api.openweathermap.org/data/2.5/weather';

// For Weather Data
const getWeatherData = city => {
    const url = `${apiBase}?q=${city}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(response => {
            if (response.status === 200) {
                spinner.style.display = "none";
                return response.json();
            };

        })
        .then(data => updateUI(data));
};

// For City Name Input
const searchBtn = document.getElementById('search_button');
searchBtn.addEventListener('click', () => {
    const inputCity = document.getElementById('city').value;
    if (inputCity === "") {
        alert.style.display = "block";
        setTimeout(() => {
            alert.style.display = "none";
        }, 2000);
    } else {
        spinner.style.display = "block";
        getWeatherData(inputCity);
    }
});

// For Update UI
const updateUI = data => {
    document.getElementById('show_city').innerText = data.name || "Unknown Location!";
    document.getElementById('show_temperature').innerText = data.main.temp;
    document.getElementById('weather_status').innerText = data.weather[0].main;
    document.getElementById('icon').setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    document.getElementById('city').value = "";
};

// For Call Weather Data Function
getWeatherData('Dhaka');