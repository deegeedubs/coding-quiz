//! Variable declarations

var questionText = document.querySelector("h2");
var questionContainer = document.querySelector(".question-container");
var answerBox = document.querySelector(".choice-box"); //ul
var choices = document.querySelectorAll(".choices"); //question choices

var message = document.querySelector("#message");
var messageIntro = message.textContent;
var score = document.querySelector("#score");
var timer = document.querySelector("#time");

var buttonBox = document.querySelector(".buttons");
var playButton = document.querySelector(".play-button");

var timerInterval;
var timeLeft = 30;

var questionCurrent;
var i = 0;

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
  "functionName();",
  ".addChild()",
];
var wrong1s = ["Application Page Input", "functionName{};", ".appendChild()"];
var wrong2s = ["Answer Plus Input", "function.call(functionName);", ".sort()"];
var wrong3s = ["All Plus Integer", "call.functionName;", ".querySelector()"];

var scoreValue = 0;

var highScores;

if (localStorage.getItem("highScores") === null){
  highScores = {
    firstScore: 0,
    firstInitial: "XXX",
    secondScore: 0,
    secondInitial: "XXX",
    thirdScore: 0,
    thirdInitial: "XXX",
    fourthScore: 0,
    fourthInitial: "XXX",
    fifthScore: 0,
    fifthInitial: "XXX",
  }
  localStorage.setItem("highScores", JSON.stringify(highScores));
}


var hs1 = document.querySelector("#score-1");
var hs2 = document.querySelector("#score-2");
var hs3 = document.querySelector("#score-3");
var hs4 = document.querySelector("#score-4");
var hs5 = document.querySelector("#score-5");

callHighScores();

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

choices[2].addEventListener("click", function (event) {
    message.textContent = messageIntro + " Incorrect. Try Again.";
    setTimeout(function () {
      message.textContent = messageIntro;
    }, 1000);
    scoreValue = scoreValue - 1;
    timeLeft = timeLeft - 5;
    score.textContent = "Score: " + scoreValue + " points";
  });

  choices[3].addEventListener("click", function (event) {
    message.textContent = messageIntro + " Incorrect. Try Again.";
    setTimeout(function () {
      message.textContent = messageIntro;
    }, 1000);
    scoreValue = scoreValue - 1;
    timeLeft = timeLeft - 5;
    score.textContent = "Score: " + scoreValue + " points";
  });

reset.addEventListener("click", resetGame);

saveScore.addEventListener("click", setHighScore);


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


// Store next question into object
function callQuestion(i) {
  questionCurrent = {
    question: questions[i],
    answer: answers[i],
    wrong1: wrong1s[i],
    wrong2: wrong2s[i],
    wrong3: wrong3s[i]
  };
  questionText.textContent = questionCurrent.question;
  choices[0].textContent = questionCurrent.answer;
  choices[1].textContent = questionCurrent.wrong1;
  choices[2].textContent = questionCurrent.wrong2;
  choices[3].textContent = questionCurrent.wrong3;

  if (i === questions.length) {
    gameOver();
  }
}

// Function for timer
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

// Function to execute when game is over
function gameOver() {
  clearInterval(timerInterval);
  questionText.textContent = "Game Over.";
  message.textContent = messageIntro;
  answerBox.style.display = "none";

  scoreValue = scoreValue + timeLeft;
  finalScore.style.display = "block";
  finalScore.textContent = "Your final score is: " + scoreValue + " points.";

  if (scoreValue > highScores.fifthScore){
    saveScore.style.display = "block";
  }
}

// Function to reset game 
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

// Function to add a new score to high score list
function setHighScore() {
    var currentInitial = prompt("Enter your initials:");
    if (currentInitial.length > 3){
      alert("Invalid Entry: Maximum of 3 characters.");
      setHighScore();
      return;
    }
    if (scoreValue > highScores.firstScore){
        highScores.fifthScore = highScores.fourthScore;
        highScores.fifthInitial = highScores.fourthInitial;
        highScores.fourthScore = highScores.thirdScore;
        highScores.fourthInitial = highScores.thirdInitial;
        highScores.thirdScore = highScores.secondScore;
        highScores.thirdInitial = highScores.secondInitial;
        highScores.secondScore = highScores.firstScore;
        highScores.secondInitial = highScores.firstInitial;
        highScores.firstScore = scoreValue;
        highScores.firstInitial = currentInitial;
    } else if (scoreValue > highScores.secondScore){
        highScores.fifthScore = highScores.fourthScore;
        highScores.fifthInitial = highScores.fourthInitial;
        highScores.fourthScore = highScores.thirdScore;
        highScores.fourthInitial = highScores.thirdInitial;
        highScores.thirdScore = highScores.secondScore;
        highScores.thirdInitial = highScores.secondInitial;
        highScores.secondScore = scoreValue;
        highScores.secondInitial = currentInitial;
    } else if (scoreValue > highScores.thirdScore){
        highScores.fifthScore = highScores.fourthScore;
        highScores.fifthInitial = highScores.fourthInitial;
        highScores.fourthScore = highScores.thirdScore;
        highScores.fourthInitial = highScores.thirdInitial;
        highScores.thirdScore = scoreValue;
        highScores.thirdInitial = currentInitial;
    } else if (scoreValue > highScores.fourthScore){
        highScores.fifthScore = highScores.fourthScore;
        highScores.fifthInitial = highScores.fourthInitial;
        highScores.fourthScore = scoreValue;
        highScores.fourthInitial = currentInitial;
    } else {
        highScores.fifthScore = scoreValue;
        highScores.fifthInitial = currentInitial;
    }
    console.log(highScores);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    saveScore.style.display = "none";
    
    callHighScores();
}

// Function to pull the high scores from local storage to  HTML
function callHighScores() {
    hsString = localStorage.getItem("highScores");
    highScores = JSON.parse(hsString);
    hs1.textContent = highScores.firstInitial + `: ` + highScores.firstScore;
    hs2.textContent = highScores.secondInitial + `: ` + highScores.secondScore;
    hs3.textContent = highScores.thirdInitial + `: ` + highScores.thirdScore;
    hs4.textContent = highScores.fourthInitial + `: ` + highScores.fourthScore;
    hs5.textContent = highScores.fifthInitial + `: ` + highScores.fifthScore;
}