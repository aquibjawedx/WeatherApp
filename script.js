const searchField = document.querySelector('#search-field');
const searchBtn = document.querySelector('#search-btn');
const weatherImage = document.querySelector('#weather-image');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');

const error_404 = document.querySelector('.error-404');

const country = document.querySelector('.country');

let header = document.querySelector(".header");
let container = document.querySelector(".container");
let moreDetails = document.querySelector(".more-details");

async function checkWeather (cityName) {
    
    const api_key = "d7bcaaa887008cd394c3cad2cc704d93";
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
    
    const response = await fetch(api_url);
    let weather_data = await response.json();
    
    if(weather_data.cod === '404') {
        container.style.display = 'none';
        moreDetails.style.display = 'none';
        error_404.style.display = 'flex';
        return;
    }
    else{
        error_404.style.display = 'none';
        container.style.display = 'flex';
        moreDetails.style.display = 'flex';
    }
    temperature.innerHTML = `${Math.round((weather_data.main.temp - 273.15))} <span>°C</span>`;
    country.innerHTML = weather_data.name;

    humidity.innerHTML = `${weather_data.main.humidity} %`;
    wind.innerHTML = `${weather_data.wind.speed} KM/h`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    switch(weather_data.weather[0].main) {
        case ('Clouds') : weatherImage.src = "./Images/cloud.svg";
        break;
        case ('Clear') : weatherImage.src = "./Images/clear.svg";
        break;
        case ('Rain') : weatherImage.src = "./Images/rain.svg";
        break;
        case ('Snow') : weatherImage.src = "./Images/snow.svg";
        break;
        default : weatherImage.src = "./Images/clear.svg";             
    }
}

checkWeather("Delhi");

searchBtn.addEventListener('click', function(e) {
    checkWeather(searchField.value);
})

searchField.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        checkWeather(searchField.value);
    }
})