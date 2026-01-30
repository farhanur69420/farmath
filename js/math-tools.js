/* =========================
   UNIT CONVERTER
========================= */
function convertLength() {
  const value = parseFloat(document.getElementById("lengthInput").value);
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;

  if (isNaN(value)) {
    document.getElementById("result").textContent = "Please enter a number.";
    return;
  }

  const toMeter = { m:1, cm:0.01, km:1000, ft:0.3048 };
  const result = value * toMeter[from] / toMeter[to];

  document.getElementById("result").textContent =
    `${value} ${from} = ${result.toFixed(4)} ${to}`;
}

/* =========================
   FLASHCARDS
========================= */
function flipCard(card) {
  card.classList.toggle("flipped");
}

/* =========================
   QUIZ ENGINE (RANDOMIZED)
========================= */

const questions = [
  {
    q: "Quick trick: 500 cm equals?",
    options: ["5 m", "50 m", "0.5 m"],
    answer: 0,
    explain: "Divide by 100. 500 ÷ 100 = 5 m."
  },
  {
    q: "1 kilometer is equal to?",
    options: ["100 m", "1000 m", "10,000 m"],
    answer: 1,
    explain: "1 km = 1000 meters."
  },
  {
    q: "Best mental shortcut: meters → km?",
    options: ["Multiply by 1000", "Divide by 100", "Divide by 1000"],
    answer: 2,
    explain: "Meters to kilometers → divide by 1000."
  },
  {
    q: "1 meter is approximately?",
    options: ["1.8 ft", "3.28 ft", "10 ft"],
    answer: 1,
    explain: "Very common trick: 1 m ≈ 3.28 ft."
  },
  {
    q: "250 cm equals?",
    options: ["2.5 m", "25 m", "0.25 m"],
    answer: 0,
    explain: "Divide by 100 → 250 cm = 2.5 m."
  }
];

let current = 0;
let score = 0;
let shuffled = [];

function startQuiz() {
  shuffled = questions.sort(() => 0.5 - Math.random()).slice(0,5);
  current = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const q = shuffled[current];
  document.getElementById("quizQ").textContent = q.q;

  q.options.forEach((opt, i) => {
    const btn = document.getElementById("opt" + i);
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
  });

  document.getElementById("quizResult").textContent = "";
  document.getElementById("scoreBox").textContent = `Score: ${score} / ${shuffled.length}`;
}

function checkAnswer(choice) {
  const q = shuffled[current];
  const result = document.getElementById("quizResult");

  if (choice === q.answer) {
    score++;
    result.textContent = "✅ Correct! " + q.explain;
  } else {
    result.textContent = "❌ Wrong. " + q.explain;
  }

  current++;
  if (current < shuffled.length) {
    setTimeout(loadQuestion, 1200);
  } else {
    setTimeout(() => {
      result.textContent = `🎉 Quiz finished! Final score: ${score} / ${shuffled.length}`;
    }, 1200);
  }
}

document.addEventListener("DOMContentLoaded", startQuiz);
