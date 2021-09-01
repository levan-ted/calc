"use strict";

/******************* DOM ELEMENTS **********************/
// Calculator display
const display = document.querySelector(".display");
const dispFirstNum = document.querySelector(".number-first");
const dispSecondNum = document.querySelector(".number-second");
const dispResult = document.querySelector(".result");
const dispOperation = document.querySelector(".operation");

// Button groups
const btnsNum = document.querySelectorAll(".btn-num");
const btnsOper = document.querySelectorAll(".btn-op");

//Single buttons
const btnEquals = document.querySelector(".btn--equals");
const btnAC = document.querySelector(".btn--ac");
const btnDEL = document.querySelector(".btn--del");
/*******************************************************/

/******************* GLOBAL VARIABLES ******************/
let firstNumber,
  secondNumber,
  operation,
  result,
  symbolCollection = [],
  currentOperand = dispFirstNum;
/*******************************************************/

/**************** FUNCTION DECLARATIONS ****************/
function getOperands(e) {
  const isDot = e.target.value === ".";
  if (isDot && currentOperand.textContent.includes(".")) return;

  if (currentOperand === dispFirstNum) {
    dispFirstNum.textContent += e.target.value;
  } else {
    dispSecondNum.textContent += e.target.value;
  }
}

function setOperation(e) {
  if (e.target.value === "-" && dispOperation.textContent) {
    currentOperand.textContent = "-" + currentOperand.textContent;
  } else {
    dispOperation.textContent = e.target.value;
    !dispSecondNum.textContent
      ? (currentOperand = dispSecondNum)
      : (currentOperand = dispFirstNum);
  }
}

function calculate(operation, a, b) {
  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    case "root":
      return Math.pow(a, 1 / b);
    case "**":
      return Math.pow(a, b);
  }
}

function displayResult() {
  if (!dispSecondNum.textContent) return;
  let result = calculate(
    dispOperation.textContent,
    +dispFirstNum.textContent,
    +dispSecondNum.textContent
  );

  dispOperation.textContent = "";
  dispSecondNum.textContent = "";
  dispFirstNum.textContent =
    !result || result === Infinity ? "ERROR" : +parseFloat(result).toFixed(10);

  currentOperand = dispFirstNum;
}

function reset() {
  dispOperation.textContent = "";
  dispSecondNum.textContent = "";
  dispFirstNum.textContent = "";
  result = undefined;
  currentOperand = dispFirstNum;
}

function del() {
  currentOperand.textContent = currentOperand.textContent
    .split("")
    .slice(0, -1)
    .join("");
}
/********************************************************/

/*************** EVENT LISTENERS ************************/
btnsNum.forEach((btn) => btn.addEventListener("click", getOperands));
btnsOper.forEach((btn) => btn.addEventListener("click", displayResult));
btnsOper.forEach((btn) => btn.addEventListener("click", setOperation));

btnEquals.addEventListener("click", displayResult);
btnAC.addEventListener("click", reset);
btnDEL.addEventListener("click", del);
/********************************************************/
