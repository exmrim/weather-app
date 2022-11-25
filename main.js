//현재 위치의 날씨 정보
//현재 날씨
//시간별 날씨
//날짜별 날씨
//그외 바람, 구름 등의 정보

const APP_ID='9fc473abb2ce6a1579a90a8ca937da5c';
let weatherIcon = document.querySelector(".weatherIcon");
let lat = '';
let lon = '';
let date = new Date();
let today = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
document.getElementById("today-date").textContent = today;

const askForCoords = () =>{
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    
}

const handleGeoSuccess = (position) => {
    lat =  position.coords.latitude;
    lon = position.coords.longitude;
    const coordsObj = {
        lat,
        lon
    };

    console.log(navigator.geolocation.getCurrentPosition);
    getCurrentWeather(lat, lon);
    getWeather(lat, lon);
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

    changeWeatherIcon(data);

    document.getElementById("location").textContent = `${data.name}`;
    document.getElementById("temp").textContent = `${data.main.temp}℉`;
    document.getElementById("description").textContent = `${data.weather[0].description.toUpperCase()}`;
    document.getElementById("temp-max").textContent = `${data.main.temp_max}℉`;
    document.getElementById("temp-min").textContent = `${data.main.temp_min}℉`;
}

const getWeather = async(lat, lon) => {
    let url = new URL(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APP_ID}`);

    fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        weatherRender(json);
    })

}

const weatherRender = (data) => {
    let str = data.list[0].dt_txt;
    console.log("whole", data);

    daily = data.list;

    let dailyHTML = "";
    dailyHTML = daily.map((weathers) => {
        if(weathers.dt_txt.substr(11,2) === '00') {

            return `
            <div class="dailyWeather">
                <div class="daily-date">
                    <p>${weathers.dt_txt.substr(5,5).replace("-","/")}</p>
                </div>
                <div class="daily-icon">
                    <img src="http://openweathermap.org/img/wn/${weathers.weather[0].icon}@2x.png">
                </div>
                <div class="daily-temp">
                    <p>
                    <i class="fa-solid fa-temperature-half"></i>
                        ${weathers.main.temp}℉
                    </p>
                </div>
            </div>
        `;  
        }
    }).join('');
    
    document.getElementById("daily").innerHTML = dailyHTML;

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



