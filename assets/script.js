var questionCurrent;
var buttonBox = document.querySelector(".buttons");
var questionContainer = document.querySelector(".question-container");
var questionText = document.querySelector("h2");
var answerBox = document.querySelector(".choice-box"); //ul
var list = answerBox.querySelectorAll(".noButton"); //li
var choices = document.querySelectorAll(".choices"); //buttons
var message = document.querySelector("#message");
var messageIntro = message.textContent;
var score = document.querySelector("#score");
var timer = document.querySelector("#time");
var playButton = document.querySelector(".play-button");
var lastScore = document.querySelector("#last-score");

var finalScore = document.createElement("h3");
questionContainer.appendChild(finalScore);

var reset = document.createElement("button");
buttonBox.appendChild(reset);
reset.classList.add("play-button");
reset.textContent = "Restart";

var saveScore = document.createElement("button");
buttonBox.appendChild(saveScore);
saveScore.classList.add("play-button");
saveScore.textContent = "Save Score";

var questions = [
  "What is an API?",
  "How do you call a function?",
  "What is not a valid method in Javascript?",
];
var answers = [
  "Application Programming Interface",
  "function();",
  ".addChild()",
];
var wrong1s = ["Application Page Input", "function{};", ".appendChild"];

var scoreValue = 0;

lastScore.textContent = localStorage.getItem("highscore");

resetGame();

//! Event Listeners 

// Click start button to begin the quiz -- event listener to call game function
playButton.addEventListener("click", function () {
  gameStart();
});

// if the correct answer is selected: display message, increase score and move to next question in list
choices[0].addEventListener("click", function (event) {
  message.textContent = messageIntro + " Correct!";
  setTimeout(function () {
    message.textContent = messageIntro;
  }, 1000);
  i++;
  callQuestion(i);
  if (i<questions.length){
    scoreValue = scoreValue + 5;
  }
  score.textContent = "Score: " + scoreValue + " points";
});

// if incorrect choice is selected: display message and decrease score
choices[1].addEventListener("click", function (event) {
  message.textContent = messageIntro + " Incorrect. Try Again.";
  setTimeout(function () {
    message.textContent = messageIntro;
  }, 1000);
  scoreValue = scoreValue - 1;
  timeLeft = timeLeft - 5;
  score.textContent = "Score: " + scoreValue + " points";
});

reset.addEventListener("click", resetGame);

saveScore.addEventListener("click", function(){
    var initials = window.prompt("Enter your initials:");
    lastScore.textContent = initials + " " + scoreValue;
    localStorage.setItem("lastscore", lastScore.textContent);
})

//! Functions

// function to begin the game
function gameStart() {
    answerBox.setAttribute("style", "display: flex");
    playButton.style.display = "none";
    reset.style.display = "block";
    // array of questions and answers
    callQuestion(i);
    startTimer();
  }

var i = 0;
// Store next question into object
function callQuestion(i) {
  questionCurrent = {
    question: questions[i],
    answer: answers[i],
    wrong1: wrong1s[i],
  };
  questionText.textContent = questionCurrent.question;
  choices[0].textContent = questionCurrent.answer;
  choices[1].textContent = questionCurrent.wrong1;

  if (i === questions.length) {
    gameOver();
  }
}
var timerInterval;
var timeLeft = 30;
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = "Time: " + timeLeft + " Seconds Remaining";
    if (timeLeft < 1) {
      gameOver();
    }
    if (i === questions.length) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function gameOver() {
  clearInterval(timerInterval);
  questionText.textContent = "Game Over.";
  message.textContent = messageIntro;
  answerBox.style.display = "none";
  scoreValue = scoreValue + timeLeft;
  finalScore.style.display = "block";
  finalScore.textContent = "Your final score is: " + scoreValue + " points.";

  saveScore.style.display = "block";
}

function resetGame() {
  scoreValue = 0;
  timeLeft = 30;
  i = 0;
  clearInterval(timerInterval);
  message.textContent = messageIntro;
  score.textContent = "Score: " + scoreValue + " points";
  timer.textContent = "Time: 30 Seconds Remaining";
  questionText.textContent = "Press Start To Begin The Quiz";
  reset.style.display = "none";
  playButton.style.display = "block";
  answerBox.setAttribute("style", "display: none");
  finalScore.style.display = "none";
  saveScore.style.display = "none";
}
