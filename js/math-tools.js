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

  const toMeter = {
    m: 1,
    cm: 0.01,
    km: 1000,
    ft: 0.3048
  };

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
   QUIZ SYSTEM
========================= */
let score = 0;
let answered = false;

function answerQuiz(isCorrect) {
  if (answered) return;

  const feedback = document.getElementById("quizResult");
  const scoreBox = document.getElementById("scoreBox

cat > /tmp/quiz.html << 'EOF'
<section>
  <h2>Quick Quiz</h2>

  <p><strong>Q:</strong> 500 cm equals how many meters?</p>

  <button onclick="answerQuiz(true)">5 m</button>
  <button onclick="answerQuiz(false)">50 m</button>
  <button onclick="answerQuiz(false)">0.5 m</button>

  <p id="quizResult"></p>
  <p id="scoreBox">Score: 0 / 1</p>

  <button onclick="resetQuiz()">Reset Quiz</button>
</section>
