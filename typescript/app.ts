const API_URL: string = "https://icanhazdadjoke.com/";
const myInit: { headers: {} } = { headers: { "Accept": "application/json" } };
const jokeParagraph: Element = document.querySelector("#joke")!;
const jokeBtn: HTMLElement = document.querySelector("#jokeBtn")!;
const ratingDiv: HTMLElement = document.querySelector("#rating")!;
const rate1Btn: HTMLElement = document.querySelector("#rate1")!;
const rate2Btn: HTMLElement = document.querySelector("#rate2")!;
const rate3Btn: HTMLElement = document.querySelector("#rate3")!;
type Joke = { joke: string, score: number, date: string };
const reportJokes: Joke[] = [];

let currentJoke: string;

// API's call function ----------------------------------------------
const showJoke = () => {
  jokeBtn.innerHTML = `Següent acudit!`;
  ratingDiv.style.display = 'flex';

  fetch(API_URL, myInit)
    .then((response) => response.json())
    .then((jokeObject: { id: string, joke: string, status: number }) => {
      jokeParagraph.innerHTML = `" ${jokeObject.joke} "`;
      currentJoke = jokeObject.joke;
    });

};

jokeBtn!.addEventListener("click", showJoke);


// Report code ------------------------------------------------------
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


