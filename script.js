const clickSound = new Audio("sounds/click.mp3");
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

let timeLeft = 10;
let timer;

const questions = [
  {
    question: "Java is ___ language?",
    options: ["Low level", "High level", "Machine", "Assembly"],
    answer: 1
  },
  {
    question: "Which one is not a data type?",
    options: ["int", "float", "boolean", "loop"],
    answer: 3
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Markup",
      "None"
    ],
    answer: 0
}
];

let current = 0;
let score = 0;
let selectedOption = null;

function loadQuestion() {
    document.querySelector(".quiz-card").style.animation = "none";
setTimeout(() => {
  document.querySelector(".quiz-card").style.animation = "fadeIn 0.6s ease";
}, 10);


    document.getElementById("progress").innerText =
    `Question ${current + 1} of ${questions.length}`;
    
    document.getElementById("question").innerText =
    questions[current].question;
    
    questions[current].options.forEach((opt, index) => {
        const btn = document.getElementById("opt" + index);
        btn.innerText = opt;
        btn.className = "";
        btn.disabled = false;
    });
    
    document.getElementById("nextBtn").style.display = "none";
    startTimer();
}

function selectOption(index) {
    clickSound.play();

    clearInterval(timer);
  selectedOption = index;

  questions[current].options.forEach((_, i) => {
    document.getElementById("opt" + i).disabled = true;
  });

  const correct = questions[current].answer;

  if (index === correct) {
  correctSound.play();
  document.getElementById("opt" + index).classList.add("correct");
  score++;
} else {
  wrongSound.play();
  document.getElementById("opt" + index).classList.add("wrong");
  document.getElementById("opt" + correct).classList.add("correct");
}

  document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  clearInterval(timer);

  document.getElementById("question").innerText = "Quiz Completed 🎉";
  document.getElementById("options").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("progress").style.display = "none";
  document.getElementById("timer-box").style.display = "none";

  const name = prompt("Enter your name:");

  const scoreData = {
    name: name || "Guest",
    score: score
  };

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push(scoreData);

  // sort high to low
  leaderboard.sort((a, b) => b.score - a.score);

  // keep only top 5
  leaderboard = leaderboard.slice(0, 5);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  document.getElementById("result").innerHTML =
    `Your Score: <b>${score} / ${questions.length}</b><br><br>
     <button onclick="location.reload()">Restart Quiz</button>`;

  showLeaderboard();
}


function startTimer() {
  timeLeft = 10;
  const bar = document.getElementById("timer-bar");
  bar.style.width = "100%";

  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    bar.style.width = (timeLeft * 10) + "%";

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}
function toggleTheme() {
  document.body.classList.toggle("dark");

  const btn = document.getElementById("themeToggle");
  if (document.body.classList.contains("dark")) {
    btn.innerText = "☀️ Light Mode";
  } else {
    btn.innerText = "🌙 Dark Mode";
  }
}
function showLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  let html = "<h3>🏆 Leaderboard</h3>";

  leaderboard.forEach((entry, index) => {
    html += `${index + 1}. ${entry.name} — ${entry.score}<br>`;
  });

  document.getElementById("leaderboard").innerHTML = html;
} function startQuiz() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("options").style.display = "block";
  document.getElementById("timer-box").style.display = "block";
  document.getElementById("progress").style.display = "block";

  current = 0;
  score = 0;

  loadQuestion();
}




