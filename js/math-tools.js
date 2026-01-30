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

function checkAnswer(answer) {
  const result = document.getElementById("quizResult");
  if (answer === 5) {
    result.textContent = "✅ Correct! 500 cm = 5 m";
  } else {
    result.textContent = "❌ Incorrect. Try again.";
  }
}

function flipCard(card) {
  card.classList.toggle("flipped");
}
