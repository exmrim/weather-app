const APP_ID='9fc473abb2ce6a1579a90a8ca937da5c';
let lat = '';
let lon = '';

const askForCoords = () =>{
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); 
}

const handleGeoSuccess = (position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const coordsObj = {
        lat,
        lon
    };

    console.log(navigator.geolocation.getCurrentPosition);
    getCurrentWeather(lat, lon);
}

const handleGeoError = (position) => {
    console.log('Cant get your position.');
}

askForCoords();

const getCurrentWeather = async(lat, lon) => {
    let url = new URL(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}`);

    fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        currentWeatherRender(json);
    })

}

const currentWeatherRender = (data) => {

    //changeWeatherIcon(data);

    let todayHTML = "";
    todayHTML = `
            <div class="today-main">
                <span class="temp">${data.main.temp}℉</span>
            </div>
            <div class="today-sub">
                <p class="description">${data.weather[0].description.toUpperCase()}</p>
                <i class="fa-solid fa-temperature-high"></i>
                <span>${data.main.temp_max}℉</span>&nbsp;&nbsp;
                <i class="fa-solid fa-temperature-low"></i>
                <span>${data.main.temp_min}℉</span>
            </div>
        `;  
    
    document.getElementById("today").innerHTML = todayHTML;
}

const changeWeatherIcon = (data) => {

    let weather = data.weather[0].main;

    if(weather === 'Clear') {
        document.querySelector("html").className = "weather-1";
    } else if(weather === 'Clouds') {
        document.querySelector("html").className = "weather-2";
    } else if(weather === 'Mist') {
        document.querySelector("html").className = "weather-3";
    } else if(weather === 'Thunderstorm') {
        document.querySelector("html").className = "weather-4";
    } else if(weather === 'Drizzle') {
        document.querySelector("html").className = "weather-5";
    } else if(weather === 'Rain') {
        document.querySelector("html").className = "weather-6";
    } else if(weather === 'Snow') {
        document.querySelector("html").className = "weather-7";
    } else if(weather === 'Atmosphere') {
        document.querySelector("html").className = "weather-8";
    } else {
        document.querySelector("html").className = "weather-9";
    }

}



