const weather = document.querySelector(".js-weather");

const API_KEY = "ea1ac8308cb30f4eb4908a1a3e8de12f";
const COORDS = 'coords';

funtion getWeather(lat,lng){
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric'
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = '${temperature} @${place}'
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));

}

funtion handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS)
    if(loadCoords === null) {
        askForCoords();
    } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();

}
init();
