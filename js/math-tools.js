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
   QUIZ ENGINE
========================= */

const questions = [
  {
    q: "500 cm equals?",
    options: ["5 m", "50 m", "0.5 m"],
    answer: 0,
    explain: "Divide by 100 → 500 ÷ 100 = 5 m."
  },
  {
    q: "1 kilometer equals?",
    options: ["100 m", "1000 m", "10,000 m"],
    answer: 1,
    explain: "1 km = 1000 m."
  },
  {
    q: "Meters to kilometers?",
    options: ["×1000", "÷100", "÷1000"],
    answer: 2,
    explain: "Meters → km: divide by 1000."
  },
  {
    q: "1 meter ≈ ? feet",
    options: ["1.8", "3.28", "10"],
    answer: 1,
    explain: "Very common trick: 1 m ≈ 3.28 ft."
  },
  {
    q: "250 cm equals?",
    options: ["2.5 m", "25 m", "0.25 m"],
    answer: 0,
    explain: "250 ÷ 100 = 2.5 m."
  }
];

let quizOrder = [];
let currentQ = 0;
let score = 0;

function startQuiz() {
  quizOrder = [...questions].sort(() => Math.random() - 0.5);
  currentQ = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = quizOrder[currentQ];
  document.getElementById("quizQ").textContent = q.q;

  q.options.forEach((opt, i) => {
    const btn = document.getElementById("opt" + i);
    btn.textContent = opt;
    btn.style.display = "inline-block";
    btn.onclick = () => answer(i);
  });

  document.getElementById("quizResult").textContent = "";
  document.getElementById("scoreBox").textContent =
    `Score: ${score} / ${quizOrder.length}`;
}

function answer(choice) {
  const q = quizOrder[currentQ];
  const result = document.getElementById("quizResult");

  if (choice === q.answer) {
    score++;
    result.textContent = "✅ Correct! " + q.explain;
  } else {
    result.textContent = "❌ Wrong. " + q.explain;
  }

  currentQ++;
  if (currentQ < quizOrder.length) {
    setTimeout(showQuestion, 1200);
  } else {
    setTimeout(() => {
      result.textContent =
        `🎉 Finished! Final score: ${score} / ${quizOrder.length}`;
    }, 1200);
  }
}

/* IMPORTANT: start quiz AFTER page loads */
document.addEventListener("DOMContentLoaded", startQuiz);
