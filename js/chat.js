const botText = document.getElementById("bot");
const optionsBox = document.getElementById("options");

function showOptions(text, options) {
  botText.innerText = text;
  optionsBox.innerHTML = "";

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.label;
    btn.onclick = opt.action;
    optionsBox.appendChild(btn);
  });
}

function startChat() {
  showOptions("What do you want to learn today?", [
    { label: "Math", action: mathFlow },
    { label: "Civil Engineering", action: civilFlow },
    { label: "I'm confused 😵", action: confusedFlow }
  ]);
}

function mathFlow() {
  showOptions("Which level?", [
    { label: "School (Class 1–12)", action: () => location.href = "math-tools/" },
    { label: "College", action: () => location.href = "math-tools/algebra/" }
  ]);
}

function civilFlow() {
  showOptions("Civil tools are math-heavy. Start with math?", [
    { label: "Yes", action: () => location.href = "math-tools/" },
    { label: "Go to Civil", action: () => location.href = "civil-tools/" }
  ]);
}

function confusedFlow() {
  showOptions("No worries. Let's start simple.", [
    { label: "Basics", action: () => location.href = "math-tools/algebra/" }
  ]);
}

startChat();

