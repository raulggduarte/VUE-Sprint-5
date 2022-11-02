// Variables --------------------------------------------------------

const WEATHER_API_KEY: string = "ce5effae2a2d9c2b020366b0c3e12afa";
const API_JOKES1_URL: string = "https://icanhazdadjoke.com/";
const myInitJokes1: { headers: {} } = { headers: { "Accept": "application/json" } };
const API_JOKES2_URL: string = "https://api.chucknorris.io/jokes/random";
const API_JOKES3_URL: string = "https://v2.jokeapi.dev/joke/Any?type=single";
const jokeParagraph: Element = document.querySelector("#joke")!;
const jokeBtn: HTMLElement = document.querySelector("#jokeBtn")!;
const btnBkgrnd: HTMLElement = document.querySelector("#btnBkgrnd")!;
const ratingDiv: HTMLElement = document.querySelector("#rating")!;
const rate1Btn: HTMLElement = document.querySelector("#rate1")!;
const rate2Btn: HTMLElement = document.querySelector("#rate2")!;
const rate3Btn: HTMLElement = document.querySelector("#rate3")!;
type Joke = { joke: string, score: number, date: string };
const reportJokes: Joke[] = [];
const weatherOutput: HTMLElement = document.querySelector("#weatherOutput")!;
const weatherIcon: HTMLElement = document.querySelector("#weatherIcon")!;
const weatherTemp: HTMLElement = document.querySelector("#weatherTemp")!;
const backImg1: HTMLElement = document.querySelector("#backImg1")!;
const backImg2: HTMLElement = document.querySelector("#backImg2")!;
const backImg3: HTMLElement = document.querySelector("#backImg3")!;


let latitude: number;
let longitude: number;
let currentJoke: string;

changeBackground();

// API's Jokes call function ----------------------------------------
const showJoke = () => {
  const random: number = Math.floor(Math.random() * 3);

  jokeBtn.innerHTML = `Següent acudit`;
  btnBkgrnd.style.width = '152.94px';
  ratingDiv.style.display = 'flex';

  if (random === 0) {
    fetch(API_JOKES1_URL, myInitJokes1)
      .then((response) => response.json())
      .then((jokeObject: { id: string, joke: string, status: number }) => {
        jokeParagraph.innerHTML = `" ${jokeObject.joke} "`;
        currentJoke = jokeObject.joke;
      });
  } else if (random === 1) {
    fetch(API_JOKES2_URL)
      .then((response) => response.json())
      .then((jokeObject: any) => {
        jokeParagraph.innerHTML = `" ${jokeObject.value} "`;
        currentJoke = jokeObject.value;
      });
  } else {
    fetch(API_JOKES3_URL)
      .then((response) => response.json())
      .then((jokeObject: { id: string, joke: string, status: number }) => {
        jokeParagraph.innerHTML = `" ${jokeObject.joke} "`;
        currentJoke = jokeObject.joke;
      });
  }

  changeBackground();
};

jokeBtn!.addEventListener("click", showJoke);


// Rating report code -----------------------------------------------
class Report {
  joke: string;
  score: number;
  date: string;

  constructor(joke: string, score: number) {
    this.joke = joke;
    this.score = score;
    this.date = new Date().toISOString();
  }

  addToReport() {
    const joke = this.joke;
    const score = this.score;
    const date = this.date;
    console.log(reportJokes);
    let exists: boolean = false;

    if (reportJokes.length > 0) {
      reportJokes.forEach(jokeElement => {
        if (jokeElement.joke === joke) {
          jokeElement.score += score;
          jokeElement.date = new Date().toISOString();
          exists = true;
        }
      });
    }

    if (!exists) { reportJokes.push({ joke, score, date }); };

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
const showWeather = (lat: number, lon: number) => {
  if (lat && lon) {
    const API_WEATHER_URL: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;

    fetch(API_WEATHER_URL)
      .then((response) => response.json())
      .then((weatherObject) => {
        const icon: string = `https://openweathermap.org/img/wn/${weatherObject["weather"][0]["icon"]}@2x.png`;
        const temp: string = Number(weatherObject["main"]["temp"]).toFixed(0);
        weatherIcon.innerHTML = `<img src=${icon}>`;
        weatherIcon.style.display = 'inline';
        weatherTemp.innerHTML = `${temp} ºC`;
        weatherTemp.style.display = 'inline';
      });

  } else {
    weatherOutput.innerHTML = `Coordinates don't found! Enable Geolocation to show today's weather...`;
  }
};

// Get device position code -----------------------------------------
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos: { coords: { latitude: number, longitude: number, accuracy: number } }): void {
  const crd = pos.coords;

  latitude = crd.latitude;
  longitude = crd.longitude;

  showWeather(latitude, longitude);
}

function error(err: { code: number, message: string }) {
  console.warn(`ERROR(${err.code}): ${err.message}`);

  showWeather(latitude, longitude);
}

navigator.geolocation.getCurrentPosition(success, error, options);


// Background images changing code ----------------------------------
function changeBackground(): void {
  backImg1.className = getClassName();
  backImg2.className = getClassName();
  backImg3.className = getClassName();
};

function getClassName(): string {
  const random: number = Math.floor(Math.random() * 9);
  const className : string = `backImg blob${random}`;
  return className;
}