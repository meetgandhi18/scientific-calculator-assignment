import { fact } from "./helper.js";

export class Calculator {
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

  //helper Functions
  evaluateExpression() {
    const result = eval(this.internalExpression);

    if (!isFinite(result)) {
      throw new Error("Invalid Calculation");
    }
    return result;
  }

  setResult(result) {
    this.displayExpression = result.toString();
    this.internalExpression = result.toString();
    this.updateDisplay(result);
  }

  handleError() {
    this.displayExpression = "";
    this.internalExpression = "";
    this.updateDisplay("Error");
  }

  applyUnaryOperation(callback) {
    try {
      const value = this.evaluateExpression();
      const result = callback(value);

      if (!isFinite(result)) {
        throw new Error("Invalid Calculation");
      }
      this.setResult(result);
    } catch (error) {
      this.handleError();
    }
  }

  toggleSign() {
    this.applyUnaryOperation((value) => -value);
  }

  square() {
    this.applyUnaryOperation((value) => value ** 2);
  }

  sqrt() {
    this.applyUnaryOperation((value) => {
      if (value < 0) throw new Error();
      return Math.sqrt(value);
    });
  }

  reciprocal() {
    this.applyUnaryOperation((value) => {
      if (value === 0) throw new Error();
      return 1 / value;
    });
  }

  absolute() {
    this.applyUnaryOperation((value) => Math.abs(value));
  }

  tenpower() {
    this.applyUnaryOperation((value) => 10 ** value);
  }

  log() {
    this.applyUnaryOperation((value) => {
      if (value <= 0) throw new Error();
      return Math.log10(value);
    });
  }

  ln() {
    this.applyUnaryOperation((value) => {
      if (value <= 0) throw new Error();
      return Math.log2(value);
    });
  }

  factorial() {
    this.applyUnaryOperation((value) => fact(value));
  }

  calculate() {
    try {
      const result = this.evaluateExpression();
      this.setResult(result);
    } catch (error) {
      this.handleError();
    }
  }

  updateDisplay(value = this.displayExpression) {
    this.display.value = value;
  }
}
