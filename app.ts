const API_URL = "https://icanhazdadjoke.com/";

const myInit = {
  headers: {"Accept": "application/json"}
};

/* FETCH
const HTMLResponse = document.querySelector("#app");
const ul = document.createElement("ul");*/

const showJoke = () => {
  fetch(API_URL, myInit)
    .then((response) => response.json())
    .then((joke) => {
      console.log(joke.joke);
    });
};

const jokeBtn2 = document.querySelector("#jokeBtn");

jokeBtn2!.addEventListener("click", showJoke);

