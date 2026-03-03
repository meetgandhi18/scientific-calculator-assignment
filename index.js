import { Calculator } from "./calculator.js";

const display = document.querySelector(".display");
const calculator = new Calculator(display);

const buttons = document.querySelectorAll(".btn-calc");

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

function handleAction(action) {
  switch (action) {
    case "clear":
      calculator.clear();
      break;

    case "backspace":
      calculator.backspace();
      break;

    case "calculate":
      calculator.calculate();
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

    default:
      console.log("Actions Not Implemented Yet: ", action);
  }
}
