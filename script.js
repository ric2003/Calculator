const display = document.getElementById("display");
const buttons = document.querySelectorAll('button');
let input = "";
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

function appendToDisplay(value) {
  if (shouldResetDisplay) {
    input = "";
    shouldResetDisplay = false;
  }
  input += value;
  display.value = input;
}

function clearDisplay() {
  input = "";
  display.value = "";
  firstOperand = null;
  operator = null;
}

function calculate() {
  let secondOperand = parseFloat(display.value);
  let result;
  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "×":
      result = firstOperand * secondOperand;
      break;
    case "÷":
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }
  display.value = result;
  input = result.toString();
  firstOperand = result;
  shouldResetDisplay = true;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (button.classList.contains("clearBtn")) {
      clearDisplay();
    } else if (button.classList.contains("numBtn") || button.classList.contains("zeroBtn")) {
      appendToDisplay(value);
    } else if (button.classList.contains("DecimalPointBtn") && !display.value.includes(".")) {
      appendToDisplay(value);
    } else if (button.classList.contains("toggleSignBtn")) {
      if (display.value[0] === "-") {
        display.value = display.value.slice(1);
      } else {
        display.value = "-" + display.value;
      }
      input = display.value;
    } else if (button.classList.contains("PercentageBtn")) {
      display.value = (parseFloat(display.value) / 100).toString();
      input = display.value;
    } else if (button.classList.contains("additionBtn") || button.classList.contains("SubtractionBtn") || button.classList.contains("MultiplicationBtn") || button.classList.contains("DivisionBtn")) {
      if (firstOperand !== null && operator !== null && !shouldResetDisplay) {
        calculate();
      } else {
        firstOperand = parseFloat(display.value);
      }
      operator = value;
      shouldResetDisplay = true;
    } else if (button.classList.contains("equalsBtn")) {
      calculate();
    }
  });
});
