import { Calculator } from "./calculator.js";
import { createHistoryManager } from "./history.js";

const display = document.querySelector(".display");
const calculator = new Calculator(display);
const historyManager = createHistoryManager();
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

const buttons = document.querySelectorAll(".btn-calc");

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.toggle("dark-mode");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const currentTheme = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";

  localStorage.setItem("theme", currentTheme);
});

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const displayValue = this.dataset.display || this.innerText;
    const internalValue = this.dataset.value;
    const action = this.dataset.action;

    if (internalValue) {
      calculator.appendValue(displayValue, internalValue);
      return;
    }
    if (action) {
      handleAction(action);
    }
  });
});

const degToggle = document.getElementById("degToggle");

degToggle.addEventListener("click", () => {
  if (calculator.angleMode === "DEG") {
    calculator.setAngleMode("RAD");
    degToggle.innerText = "RAD";
  } else {
    calculator.setAngleMode("DEG");
    degToggle.innerText = "DEG";
  }
});

function renderHistory() {
  const history = historyManager.get();
  historyList.innerHTML = history.map((item) => `<div>${item}</div>`).join("");
}

clearHistoryBtn.addEventListener("click", () => {
  historyManager.clear();
  renderHistory();
});

renderHistory();

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    calculator.appendValue(key, key);
  }

  if (["+", "-", "*", "/", "%"].includes(key)) {
    calculator.appendValue(key, key);
  }

  if (key === ".") {
    calculator.appendValue(".", ".");
  }

  if (key === "^") {
    calculator.appendValue("^", "**");
  }

  if (key === "(" || key === ")") {
    calculator.appendValue(key, key);
  }

  if (key === "e" || key === "E") {
    calculator.appendValue("2.718281828459045", Math.E);
  }

  if (key === "Enter") {
    e.preventDefault();
    const calcResult = calculator.calculate();
    if (calcResult) {
      historyManager.add(`${calcResult.expression} = ${calcResult.result}`);
      renderHistory();
    }
  }

  if (key === "Backspace") {
    calculator.backspace();
  }

  if (key === "Escape") {
    calculator.clear();
  }
});

function handleAction(action) {
  switch (action) {
    case "clear":
      calculator.clear();
      break;

    case "backspace":
      calculator.backspace();
      break;

    case "calculate":
      const calcResult = calculator.calculate();
      if (calcResult) {
        historyManager.add(`${calcResult.expression} = ${calcResult.result}`);
        renderHistory();
      }
      break;

    case "toggleSign":
      calculator.toggleSign();
      break;

    case "square":
      calculator.square();
      break;

    case "sqrt":
      calculator.sqrt();
      break;

    case "reciprocal":
      calculator.reciprocal();
      break;

    case "absolute":
      calculator.absolute();
      break;

    case "tenpower":
      calculator.tenpower();
      break;

    case "log":
      calculator.log();
      break;

    case "ln":
      calculator.ln();
      break;

    case "factorial":
      calculator.factorial();
      break;

    case "floor":
      calculator.floor();
      break;

    case "ceil":
      calculator.ceil();
      break;

    case "round":
      calculator.round();
      break;

    case "cube":
      calculator.cube();
      break;

    case "sin":
      calculator.sin();
      break;

    case "cos":
      calculator.cos();
      break;

    case "tan":
      calculator.tan();
      break;

    case "sec":
      calculator.sec();
      break;

    case "csc":
      calculator.csc();
      break;

    case "cot":
      calculator.cot();
      break;

    case "ms":
      calculator.memoryStore();
      break;

    case "mr":
      calculator.memoryRecall();
      break;

    case "mc":
      calculator.memoryClear();
      break;

    case "mplus":
      calculator.memoryAdd();
      break;

    case "mminus":
      calculator.memorySubtract();
      break;

    default:
      console.log("Actions Not Implemented Yet: ", action);
  }
}
