"use strict";
// Variables --------------------------------------------------------
const WEATHER_API_KEY = "ce5effae2a2d9c2b020366b0c3e12afa";
const API_JOKES1_URL = "https://icanhazdadjoke.com/";
const myInitJokes1 = { headers: { "Accept": "application/json" } };
const API_JOKES2_URL = "https://api.chucknorris.io/jokes/random";
const API_JOKES3_URL = "https://v2.jokeapi.dev/joke/Any?type=single";
const jokeParagraph = document.querySelector("#joke");
const jokeBtn = document.querySelector("#jokeBtn");
const ratingDiv = document.querySelector("#rating");
const rate1Btn = document.querySelector("#rate1");
const rate2Btn = document.querySelector("#rate2");
const rate3Btn = document.querySelector("#rate3");
const reportJokes = [];
const weatherOutput = document.querySelector("#weather");
let latitude;
let longitude;
let currentJoke;
// API's Jokes call function ----------------------------------------
const showJoke = () => {
    const random = Math.floor(Math.random() * 3);
    jokeBtn.innerHTML = `Següent acudit!`;
    ratingDiv.style.display = 'flex';
    if (random === 0) {
        fetch(API_JOKES1_URL, myInitJokes1)
            .then((response) => response.json())
            .then((jokeObject) => {
            jokeParagraph.innerHTML = `" ${jokeObject.joke} "`;
            currentJoke = jokeObject.joke;
        });
    }
    else if (random === 1) {
        fetch(API_JOKES2_URL)
            .then((response) => response.json())
            .then((jokeObject) => {
            jokeParagraph.innerHTML = `" ${jokeObject.value} "`;
            currentJoke = jokeObject.value;
        });
    }
    else {
        fetch(API_JOKES3_URL)
            .then((response) => response.json())
            .then((jokeObject) => {
            jokeParagraph.innerHTML = `" ${jokeObject.joke} "`;
            currentJoke = jokeObject.joke;
        });
    }
};
jokeBtn.addEventListener("click", showJoke);
// Rating report code -----------------------------------------------
class Report {
    constructor(joke, score) {
        this.joke = joke;
        this.score = score;
        this.date = new Date().toISOString();
    }
    addToReport() {
        const joke = this.joke;
        const score = this.score;
        const date = this.date;
        console.log(reportJokes);
        let exists = false;
        if (reportJokes.length > 0) {
            reportJokes.forEach(jokeElement => {
                if (jokeElement.joke === joke) {
                    jokeElement.score += score;
                    jokeElement.date = new Date().toISOString();
                    exists = true;
                }
            });
        }
        if (!exists) {
            reportJokes.push({ joke, score, date });
        }
        ;
        ratingDiv.style.display = 'none';
    }
}
rate1Btn.addEventListener("click", () => {
    const report = new Report(currentJoke, 1);
    report.addToReport();
});
rate2Btn.addEventListener("click", () => {
    const report = new Report(currentJoke, 2);
    report.addToReport();
});
rate3Btn.addEventListener("click", () => {
    const report = new Report(currentJoke, 3);
    report.addToReport();
});
// API's Weather call function --------------------------------------
const showWeather = (lat, lon) => {
    if (lat && lon) {
        const API_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
        fetch(API_WEATHER_URL)
            .then((response) => response.json())
            .then((weatherObject) => {
            const icon = `https://openweathermap.org/img/wn/${weatherObject["weather"][0]["icon"]}@2x.png`;
            const description = weatherObject["weather"][0]["main"];
            weatherOutput.innerHTML = `Today's weather: <img src=${icon}> ${description}`;
        });
    }
    else {
        weatherOutput.innerHTML = `Coordinates don't found! Enable Geolocation to show today's weather...`;
    }
};
// Get device position code -----------------------------------------
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
function success(pos) {
    const crd = pos.coords;
    latitude = crd.latitude;
    longitude = crd.longitude;
    showWeather(latitude, longitude);
}
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    showWeather(latitude, longitude);
}
navigator.geolocation.getCurrentPosition(success, error, options);
