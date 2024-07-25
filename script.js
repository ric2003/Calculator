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

function isNumericChar(c) {
  return c >= '0' && c <= '9';
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
  if (isNaN(result) || result === Number.POSITIVE_INFINITY || result === Number.NEGATIVE_INFINITY) {
    result = "Error";
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
      if(display.value==""||display.value=="-"){
        appendToDisplay("0" + value);
      }else{
        appendToDisplay(value);
      } 
    } else if (button.classList.contains("toggleSignBtn")) {
      if (display.value[0] === "-") {
        display.value = display.value.slice(1);
      }else if(isNumericChar(display.value[0])){
        display.value = "-" + display.value;
      }
      input = display.value;
    } else if (button.classList.contains("PercentageBtn")) {
      let PercentageResult = (parseFloat(display.value) / 100).toString();
      if(isNaN(PercentageResult)){
        PercentageResult = "Error";
      }
      display.value = PercentageResult;
      input = display.value;
    }else if(button.classList.contains("SubtractionBtn")&&firstOperand == null&&display.value ==""){
      appendToDisplay("-")
    } else if (button.classList.contains("additionBtn") || button.classList.contains("SubtractionBtn") || button.classList.contains("MultiplicationBtn") || button.classList.contains("DivisionBtn")) {
      if (firstOperand !== null && operator !== null && !shouldResetDisplay) {
        calculate();
      } else {
        firstOperand = parseFloat(display.value);
      }
      operator = value;
      shouldResetDisplay = true;
    } else if (button.classList.contains("equalsBtn")) {
      if (firstOperand !== null && operator !== null && !shouldResetDisplay) {
        calculate();
      }else{
        display.value = "Error";
      }
    }
  });
});
