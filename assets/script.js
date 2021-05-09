let timeEl = document.querySelector("#time");
let questionEl = document.querySelector("#question")
let secondsLeft = 50;
let endScreen = document.querySelector(".end-screen-elements")
let ans1 = document.getElementById('ans1');
let ans2 = document.getElementById('ans2');
let ans3 = document.getElementById('ans3');
let ans4 = document.getElementById('ans4');
let instructions = document.querySelector('#instructions');
let startBtn = document.querySelector("#start");
let startQui = "Start Quiz!"
let questContent = [
  {
    quest: "Commonly used data types DO NOT include:",
    a: "A. Strings",
    b: "B. Booleans",
    c: "C. Alerts",
    d: "D. Numbers",
    answer: "C. Alerts"
  }
  ,
  {
    quest: "Arrays in Javascript can be used to store ___.",
    a: "A. Numbers and Strings",
    b: "B. Other Arrays",
    c: "C. Booleans",
    d: "D. All of the Above",
    answer: "D. All of the Above"
  }
  ,
  {
    quest: "The condition within an in/else statement is enclosed within ___.",
    a: "A. Quotes",
    b: "B. Curly Brackets",
    c: "C. Parenthesis",
    d: "D. Square Brackets",
    answer: "D. Square Brackets"
  },
  {
    quest: "String values must be enclosed within ___ when being assigned to variables",
    a: "A. Commas",
    b: "B. Curly Brackets",
    c: "C. Quotes",
    d: "D. Parenthesis",
    answer: "D. Parenthesis"
  },

  {
    quest: "A very useful tool during developments and debugging for printing content to the debugger is ___.",
    a: "A. Javascript",
    b: "B. Terminal/Bash",
    c: "C. For Loops",
    d: "D. console.log",
    answer: "D. console.log"
  }

];

let timerInterval;
let ansBtns = document.querySelector('.ansBtns');
//When the Start Quiz button is pushed, quiz begins and timer starts.
function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0) {
      // Stops timer once it reaches 0
      clearInterval(timerInterval);
      timeEl.textContent = "Time: 0"
      secondsLeft = 0;
    }
  }, 1000);
  startBtn.style.display = "none";
  startQuiz();
};
let selectedChoice;
var qCount = 0;

function getBtnValue(event) {
  let target = event.target;
  selectedChoice = target.innerText;
  console.log(selectedChoice);
  var answer = questContent[qCount].answer;
  if (answer !== selectedChoice) {
    secondsLeft = secondsLeft-10;
  }
}
//startBtn.addEventListener('click', getBtnValue)
ansBtns.addEventListener('click', getBtnValue)


function startQuiz() {
  question = document.querySelector('#question');
  question.style.color = "black";
  question.style.fontSize = "35px";
  question.textContent = questContent[0].quest;
  instructions.style.display = "none";
  ans1.style.display = "block";
  ans1.textContent = questContent[0].a
  ans2.style.display = "block";
  ans2.textContent = questContent[0].b
  ans3.style.display = "block";
  ans3.textContent = questContent[0].c
  ans4.style.display = "block";
  ans4.textContent = questContent[0].d;
  ansBtns.addEventListener("click", quest2);
};

function quest2() {
  qCount = 1;
  question.textContent = questContent[1].quest;
  ans1.textContent = questContent[1].a
  ans2.textContent = questContent[1].b
  ans3.textContent = questContent[1].c
  ans4.textContent = questContent[1].d;
  ansBtns.addEventListener("click", quest3);
}
function quest3() {
  qCount = 2;
  question.textContent = questContent[2].quest;
  ans1.textContent = questContent[2].a
  ans2.textContent = questContent[2].b
  ans3.textContent = questContent[2].c
  ans4.textContent = questContent[2].d;
  ansBtns.addEventListener("click", quest4)
}
function quest4() {
  qCount = 3;
  question.textContent = questContent[3].quest;
  ans1.textContent = questContent[3].a
  ans2.textContent = questContent[3].b
  ans3.textContent = questContent[3].c
  ans4.textContent = questContent[3].d;
  ansBtns.addEventListener("click", quest5)
}
function quest5() {
  qCount = 4;
  question.textContent = questContent[4].quest;
  ans1.textContent = questContent[4].a
  ans2.textContent = questContent[4].b
  ans3.textContent = questContent[4].c
  ans4.textContent = questContent[4].d;
  ansBtns.addEventListener("click", highScore)
};

function highScore(){
  //hide question container
  ansBtns.style.display = "none";
  //show the end screen elements
  //display the score
  question.textContent = "You've completed the quiz! Your score is: "+ secondsLeft;
  endScreen.style.display = "block";

  
  //stop the timer
  clearInterval(timerInterval);
  timeEl.textContent = "Time: " + secondsLeft;
}

document.querySelector("#save").addEventListener("click",function() {
  //get the input value
  const username = document.querySelector("#user-name-input").value;
  //get local storage if it exists - old data
  const existingData = JSON.parse(localStorage.getItem("highscores")) || [];
  //create new data entry
  const newEntry = {
    username: username,
    score: secondsLeft
  }
  //add new adta entry to old data
  existingData.push(newEntry);
  //save updated data to local
  localStorage.setItem("highscores",JSON.stringify(existingData));

  //show
  showHighScore();
});


const showHighScore = () => {
    //get local storage if it exists - old data
    const data = JSON.parse(localStorage.getItem("highscores")) || [];
    //create a template
    let template = "";
    
    for (let i = 0; i < data.length; i++) {
      template += `
      <div class="row">
      <span>useranme: ${data[i].username}</span>
      <span>score: ${data[i].score}</span>
      </div>
      `;
    }

    document.querySelector(".ansBtns").innerHTML = template;
  }
  document.querySelector("#highscore").addEventListener("click",showHighScore)