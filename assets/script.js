var questionCurrent;
var questionContainer = document.querySelector("body");
var questionText = document.querySelector("h2");
var answerBox = document.querySelector(".choice-box"); //ul
var list = answerBox.querySelectorAll(".noButton"); //li
var choices = document.querySelectorAll(".choices"); //buttons
var message = document.querySelector("#message");
var messageIntro = message.textContent;
var score = document.querySelector("#score");
var timer = document.querySelector("#time");
var playButton = document.querySelector(".play-button");

var reset = document.createElement("button");

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

// Click start button to begin the quiz -- event listener to call game function
playButton.addEventListener("click", function () {
  playButton.style.display = "none";

  // questionContainer.appendChild(reset);
  // reset.classList.add("play-button");
  // reset.textContent = "Restart";
  gameStart();
});

// function to begin the game
function gameStart() {
  answerBox.setAttribute("style", "display: flex");
  // array of questions and answers
  message.textContent = messageIntro;
  score.textContent = "Score: " + scoreValue + " points";
  timer.textContent = "Time: 30 Seconds Remaining";
  callQuestion(i);
  startTimer();
}

// if the correct answer is selected: display message, increase score and move to next question in list
choices[0].addEventListener("click", function (event) {
  message.textContent = messageIntro + " Correct!";
  setTimeout(function () {
    message.textContent = messageIntro;
  }, 1000);
  i++;
  callQuestion(i);
  scoreValue = scoreValue + 5;
  console.log(scoreValue);
  score.textContent = "Score: " + scoreValue + " points";
});

// if incorrect choice is selected: display message and decrease score
choices[1].addEventListener("click", function (event) {
  message.textContent = messageIntro + " Incorrect. Try Again.";
  setTimeout(function () {
    message.textContent = messageIntro;
  }, 1000);
});

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
    questionText.textContent = "Game Over.";
    message.textContent = messageIntro;
    answerBox.style.display = "none";
  }
}

var timeLeft = 30;
function startTimer() {
  var timerInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = "Time: " + timeLeft + " Seconds Remaining";
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      questionText.textContent = "Game Over.";
      message.textContent = messageIntro;
      answerBox.style.display = "none";
    }
    if (i === questions.length) {
      clearInterval(timerInterval);
    }
  }, 1000);
}
