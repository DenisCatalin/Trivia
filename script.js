const url = [
    "https://opentdb.com/api.php?amount=1&category=9&type=multiple", // General
    "https://opentdb.com/api.php?amount=1&category=10&type=multiple", // Entertainment: Books
    "https://opentdb.com/api.php?amount=1&category=11&type=multiple", // Entertainment: Film
    "https://opentdb.com/api.php?amount=1&category=12&type=multiple", // Entertainment: Music
    "https://opentdb.com/api.php?amount=1&category=13&type=multiple", // Entertainment: Musicals & Theatres
    "https://opentdb.com/api.php?amount=1&category=14&type=multiple", // Entertainment: Television
    "https://opentdb.com/api.php?amount=1&category=15&type=multiple", // Entertainment: Video Games
    "https://opentdb.com/api.php?amount=1&category=16&type=multiple", // Entertainment: Board Games
    "https://opentdb.com/api.php?amount=1&category=17&type=multiple", // Science & Nature
    "https://opentdb.com/api.php?amount=1&category=18&type=multiple", // Science: Computers
    "https://opentdb.com/api.php?amount=1&category=19&type=multiple", // Science: Mathematics
    "https://opentdb.com/api.php?amount=1&category=20&type=multiple", // Mythology
    "https://opentdb.com/api.php?amount=1&category=21&type=multiple", // Sports
    "https://opentdb.com/api.php?amount=1&category=22&type=multiple", // Geography
    "https://opentdb.com/api.php?amount=1&category=23&type=multiple", // History
    "https://opentdb.com/api.php?amount=1&category=24&type=multiple", // Politics
    "https://opentdb.com/api.php?amount=1&category=25&type=multiple", // Art
    "https://opentdb.com/api.php?amount=1&category=26&type=multiple", // Celebrities
    "https://opentdb.com/api.php?amount=1&category=27&type=multiple", // Animals
    "https://opentdb.com/api.php?amount=1&category=28&type=multiple", // Vehicles
    "https://opentdb.com/api.php?amount=1&category=29&type=multiple", // Entertainment: Comics
    "https://opentdb.com/api.php?amount=1&category=30&type=multiple", // Science: Gadgets
    "https://opentdb.com/api.php?amount=1&category=31&type=multiple", // Entertainment: Japanese Anime & Manga
    "https://opentdb.com/api.php?amount=1&category=32&type=multiple" // Entertainment: Cartoon & Animations
];

let newUrl = [];
const loadingAnim = document.querySelector(".lds-spinner");
const mainDiv = document.querySelector(".questions");
const helper = document.querySelector(".helper");
const startBtn = document.querySelector(".start");
const continueBtn = document.querySelector(".continue");
continueBtn.style.display = "none";
let correct;
let choices = [];
let points = 0;
let lives = 3;
let random;
let seconds = 100;
let timer;
let answerTimer;
let categs = 0;
let bonus = 0;
let choicesButton = [];

loadingAnim.style.display = "none";

class UI {
    static getQuestion(data) {
        data.results.map(result => {
            correct = result.correct_answer;
            random = Math.floor(Math.random() * 4);
            arrangeAnswers(result, random);
            mainDiv.innerHTML = `
            <div class="question">
                <div class="question-card">
                    <div class="question-info">
                        <h3><i class="fas fa-archive"></i> ${result.category}</h3>
                        <h3><i class="fas fa-question"></i> ${points}</h3>
                        <h3><i class="fas fa-heart"></i> ${lives}</h3>
                        <h3><i class="fas fa-dumbbell"></i> ${result.difficulty}</h3>
                    </div>
                    <div class="timer"></div>
                    <div class="question-text">
                        <h2>${result.question}</h2>
                    </div>
                    <div class="buttons">
                    <div class="choices">
                        <button class="choice1">${choices [0]}</button>
                        <button class="choice2">${choices [1]}</button>
                        <button class="choice3">${choices [2]}</button>
                        <button class="choice4">${choices [3]}</button>
                    </div>
                    <div class="helps">
                        <button class="helper">Show right answer</button>
                    </div>
                </div>     
            </div>
            `;
        });
        // timerr();
        const helpBtn = document.querySelector(".helps");
        if(bonus >= 3) helpBtn.style.display = "flex";
        else helpBtn.style.display = "none";
        loadingAnim.style.display = "none";
        continueBtn.style.display = "none";
        document.querySelector(".timer").style.width = "100%";
    }
    static selectCategs() {
        startBtn.style.display = "none";
        mainDiv.innerHTML = `
        <div class="category">
            <div class="title">
                <h2>Select a category of questions:</h2>
                <p>Categories selected: ${newUrl.length}</p>
            </div>
            <div class="categories">
                <button class="categ">General Knowledge</button>
                <button class="categ">Books</button>
                <button class="categ">Film</button>
                <button class="categ">Music</button>
                <button class="categ">Musicals & Theatres</button>
                <button class="categ">Television</button>
                <button class="categ">Video Games</button>
                <button class="categ">Board Games</button>
                <button class="categ">Science & Nature</button>
                <button class="categ">Computers</button>
                <button class="categ">Mathematics</button>
                <button class="categ">Mythology</button>
                <button class="categ">Sports</button>
                <button class="categ">Geography</button>
                <button class="categ">History</button>
                <button class="categ">Politics</button>
                <button class="categ">Art</button>
                <button class="categ">Celebrities</button>
                <button class="categ">Animals</button>
                <button class="categ">Vehicles</button>
                <button class="categ">Comics</button>
                <button class="categ">Gadgets</button>
                <button class="categ">Japanese Anime & Manga</button>
                <button class="categ">Cartoon & Animations</button>
                <button class="categ">All</button>
            </div>
        </div>
        `;
    }
}

async function getData() {
    loadingAnim.style.display = "inline-block";
    mainDiv.innerHTML = "";
    let randurl;
    let dataFetch;
    if(categs === 24) {
        randurl = Math.floor(Math.random() * 24);
        dataFetch = await fetch(url[randurl]);
    }    
    else {
        randurl = Math.floor(Math.random() * categs);
        dataFetch = await fetch(newUrl[randurl]);
    }    
    
    const data = await dataFetch.json();
    mainDiv.innerHTML = "";
    UI.getQuestion(data);
}

UI.selectCategs();

const buttons = document.querySelectorAll(".categ");
buttons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
        e.target.classList.toggle("selected");
        if(index === 24) {
            for(let i = 0; i < 24; i++) {
                if(buttons[i].classList.contains("selected")) buttons[i].classList.toggle("selected");
            }
        } else {
            if(buttons[24].classList.contains("selected")) buttons[24].classList.toggle("selected");   
        }
        if(e.target.classList.contains("selected")) {
            if(index != 24) {
                categs++;
                newUrl.push(url[index]);
            } else categs = 24;
        } else {
            if(index != 24) {
                categs--;
                let newIndex = index;
                newUrl.forEach((link, index) => {
                    if(link === url[newIndex]) newUrl.splice(index, 1);
                });
            } else categs = 0;
        }
        if(categs > 0) continueBtn.style.display = "initial";
        else continueBtn.style.display = "none";
        document.querySelector(".title p").innerHTML = 
        `
            <p>Categories selected: ${categs}</p>
        `;
    });
});

function timerr() {
    timer = setInterval(() => {
        seconds -= 10;
        document.querySelector(".timer").style.width = `${seconds}%`;
        if(seconds === 0) {
            clearInterval(timer);
            checkAnswers("NULL");
        }     
    }, 1000);
}

function showAnswers() {
    switch(random) {
        case 0: {
            document.querySelector(".choice1").style.background = "green";
            document.querySelector(".choice2").style.background = "tomato";
            document.querySelector(".choice3").style.background = "tomato";
            document.querySelector(".choice4").style.background = "tomato";
            break;
        }
        case 1: {
            document.querySelector(".choice1").style.background = "tomato";
            document.querySelector(".choice2").style.background = "green";
            document.querySelector(".choice3").style.background = "tomato";
            document.querySelector(".choice4").style.background = "tomato";
            break;
        }
        case 2: {
            document.querySelector(".choice1").style.background = "tomato";
            document.querySelector(".choice2").style.background = "tomato";
            document.querySelector(".choice3").style.background = "green";
            document.querySelector(".choice4").style.background = "tomato";
            break;
        }
        case 3: {
            document.querySelector(".choice1").style.background = "tomato";
            document.querySelector(".choice2").style.background = "tomato";
            document.querySelector(".choice3").style.background = "tomato";
            document.querySelector(".choice4").style.background = "green";
            break;
        }
    }
    answerTimer = setInterval(() => {
        clearInterval(answerTimer);
        if(lives !== 0) {
            document.querySelector(".choice1").style.background = "rgb(209, 209, 209)";
            document.querySelector(".choice2").style.background = "rgb(209, 209, 209)";
            document.querySelector(".choice3").style.background = "rgb(209, 209, 209)";
            document.querySelector(".choice4").style.background = "rgb(209, 209, 209)";
        }
    }, 3000);
}

function checkAnswers(answer) {
    seconds = 100;
    if(answer === correct) {
        showAnswers();
        points++;
        bonus++;
        setTimeout(() => {
            getData();
        }, 3000);
    } else {
        showAnswers();
        lives--;
        if(lives === 0) {
            clearInterval(timer);
            mainDiv.innerHTML = "";
            mainDiv.innerHTML = `<h3>You Lost<br>You had ${points} points</h3>`;
        } else setTimeout(() => {
            getData();
        }, 3000);
    }    
}

function arrangeAnswers(result, nr) {
    switch(nr) {
        case 0: {
            choices [0] = result.correct_answer;
            choices [1] = result.incorrect_answers[0];
            choices [2] = result.incorrect_answers[1];
            choices [3] = result.incorrect_answers[2];
            break;
        }
        case 1: {
            choices [0] = result.incorrect_answers[0];
            choices [1] = result.correct_answer;
            choices [2] = result.incorrect_answers[1];
            choices [3] = result.incorrect_answers[2];
            break;
        }
        case 2: {
            choices [0] = result.incorrect_answers[0];
            choices [1] = result.incorrect_answers[1];
            choices [2] = result.correct_answer;
            choices [3] = result.incorrect_answers[2];
            break;
        }
        case 3: {
            choices [0] = result.incorrect_answers[0];
            choices [1] = result.incorrect_answers[1];
            choices [2] = result.incorrect_answers[2];
            choices [3] = result.correct_answer;
            break;
        }
    }
}

continueBtn.addEventListener("click", () => {
    if(categs !== 0) getData();
    else return true;
});

document.querySelector("body").addEventListener("click", (e) => {
    if(e.target.classList.contains("choice1")) checkAnswers(choices [0]);
    if(e.target.classList.contains("choice2")) checkAnswers(choices [1]);
    if(e.target.classList.contains("choice3")) checkAnswers(choices [2]);
    if(e.target.classList.contains("choice4")) checkAnswers(choices [3]);
    if(e.target.classList.contains("helper")) {
        switch(random) {
            case 0: {
                document.querySelector(".choice1").classList.toggle("green");
                bonus = 0;
                break;
            }
            case 1: { 
                document.querySelector(".choice2").classList.toggle("green");
                bonus = 0;
                break;
            }
            case 2: { 
                document.querySelector(".choice3").classList.toggle("green");
                bonus = 0;
                break;
            }
            case 3: { 
                document.querySelector(".choice4").classList.toggle("green");
                bonus = 0;
                break;
            }
        }
    }
});