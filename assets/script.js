var questionI;
var questionContainer = document.querySelector("body");
var questionText = document.querySelector("h2");
var answerBox = document.querySelector(".choice-box");
var choices = document.querySelectorAll(".choices");
var message = document.querySelector("#message")
var score = document.querySelector("#score");
var playButton = document.querySelector(".play-button");
var reset = document.createElement("button");

var questions = [
    "What is an API?",
    "How do you call a function?",
    "What is not a valid method in Javascript?"
    ];
    var answers = [
    "Application Programming Interface",
    "function();",
    ".addChild()"
    ];
    var wrong1s = [
    "Application Page Input",
    "function{};",
    ".appendChild"
    ];

    var scoreValue = 0;
    
    // Click start button to begin the quiz -- event listener to call game function
    playButton.addEventListener("click", function(){
        gameStart();
        
        playButton.style.display = "none";
        
        questionContainer.appendChild(reset);
        reset.classList.add("play-button");
        reset.textContent = "Restart";
        
    });
    
    reset.addEventListener("click", gameStart);
    
    
    // function to begin the game
function gameStart(){
    answerBox.style.display = "flex";
    // array of questions and answers
    message.textContent = "";
    
    var i = 0;
    callQuestion(i);

    // if the correct answer is selected: display message, increase score and move to next question in list
    choices[0].addEventListener("click", function(event){
        message.textContent = "Correct!";
        i++;
        callQuestion(i);
        console.log(i);
    });
    
    // if incorrect choice is selected: display message and decrease score
    choices[1].addEventListener("click", function(event){
        event.stopPropagation();
        event.preventDefault();
        message.textContent = "Incorrect. Try Again.";
    });
    console.log(questions.length);

    function callQuestion(){
        questionI = {
                question: questions[i],
                answer: answers[i],
                wrong1: wrong1s[i]
        }
        questionText.textContent = questionI.question;
        choices[0].textContent = questionI.answer;
        choices[1].textContent = questionI.wrong1; 
        
        if (i === (questions.length)){
            questionText.textContent = "Game Over."
            message.textContent = "";
            answerBox.style.display = "none";
        }
    }

    
}


