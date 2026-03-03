class Calculator {
  constructor(displayElement) {
    this.display = displayElement;
    this.displayExpression = "";
    this.internalExpression = "";
  }
  appendValue(displayValue, internalValue) {

    // prevent two operators in a row
    const operators = ["+", "-", "*", "/", "%", "**"];
    const lastChar = this.internalExpression.slice(-1);

    if (operators.includes(internalValue) && operators.includes(lastChar)) {
      return;
    }

    // prevent multiple decimals in same number
    if (internalValue === ".") {
      const parts = this.internalExpression.split(/[\+\-\*\/%\(\)]/);
      const lastNumber = parts[parts.length - 1];

      if (lastNumber.includes(".")) {
        return;
      }
    }

    // prevent Starting With Operator
    if (
      this.internalExpression === "" &&
      ["+", "*", "/", "%", "**"].includes(internalValue)
    ) {
      return;
    }

    this.displayExpression += displayValue;
    this.internalExpression += internalValue;
    this.updateDisplay();
  }
  clear() {
    this.displayExpression = "";
    this.internalExpression = "";
    this.updateDisplay("0");
  }
  backspace() {
    this.displayExpression = this.displayExpression.slice(0, -1);
    this.internalExpression = this.internalExpression.slice(0, -1);
    this.updateDisplay(this.displayExpression || "0");
  }
  toggleSign(){
    try{
        const value = eval(this.internalExpression);

        if (!isFinite(value)) {
            throw new Error("Invalid Calculation");
        }

        const result = -value;
        this.displayExpression = result.toString();
        this.internalExpression = result.toString();
        this.updateDisplay(result);
    }catch(error){
        this.updateDisplay("Error");
        this.displayExpression = "";
        this.internalExpression = "";   
    }
  }

  calculate() {
    try {
      const result = eval(this.internalExpression);

      if (!isFinite(result)) {
        throw new Error("Invalid Calculation");
      }

      this.displayExpression = result.toString();
      this.internalExpression = result.toString();
      this.updateDisplay(result);
    } catch (error) {
      this.updateDisplay("Error");
      this.displayExpression = "";
      this.internalExpression = "";
    }
  }

  updateDisplay(value = this.displayExpression) {
    this.display.value = value;
  }
}

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

    default:
      console.log("Actions Not Implemented Yet: ", action);
  }
}
error