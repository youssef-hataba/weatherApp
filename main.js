const apiKey = '3e2722e72b23992365330191813e866e';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const cityInput = document.querySelector('input');
const searchBTN = document.querySelector('button');
const image = document.querySelector('.weather-icon');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status === 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        let data = await response.json();
        document.querySelector('.error').style.display = 'none';

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        if (data.weather[0].main === 'Clear') {
            image.src = 'images/clear.png';
        } else if (data.weather[0].main === 'Clouds') {
            image.src = 'images/clouds.png';
        } else if (data.weather[0].main === 'Rain') {
            image.src = 'images/rain.png';
        } else if (data.weather[0].main === 'Drizzle') {
            image.src = 'images/drizzle.png';
        } else if (data.weather[0].main === 'Mist') {
            image.src = 'images/mist.png';
        }
        document.querySelector('.weather').style.display = 'block';
    }
    localStorage.setItem('city', city);
}

searchBTN.addEventListener('click', () => {
    checkWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkWeather(cityInput.value);
    }
});

function showCity() {
    const savedCity = localStorage.getItem('city');
    if (savedCity) {
        cityInput.value = savedCity;
        checkWeather(savedCity);
    }
}

showCity();
