
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        return undefined;
    }
    return a / b;
}

let firstNumber = "";
let operator = "";
let secondNumber = "";

const operate = (op, a, b) => {
    switch (op) {
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            return divide(a, b);
        default:
            return undefined;
    }
}

const keyboardNumberButtons = document.querySelectorAll(".number");

const onNumberClick = (e) => {
    if (operator) {
        secondNumber += e.target.textContent;
        updateDisplay(secondNumber);
    } else {
        firstNumber += e.target.textContent;
        updateDisplay(firstNumber);
    }
}


keyboardNumberButtons.forEach((button) => {
    button.addEventListener("click", onNumberClick);
})


const displayContent = document.querySelector(".result");

const updateDisplay = (content) => {
    displayContent.textContent = content;
}

const keyboardOperatorButtons = document.querySelectorAll(".operator");

const onOperatorClick = (e) => {
    if (secondNumber) {
        calculate(true);
        updateDisplay(firstNumber);
    } else {
        updateDisplay(e.target.textContent);
    }
    operator = e.target.id;
}

keyboardOperatorButtons.forEach((button) => button.addEventListener("click", onOperatorClick));

const equalsButton = document.querySelector("#equals");

const reset = () => {
    firstNumber = "";
    secondNumber = "";
    operator = "";
}

const onEqualsClick = (e) => {
    calculate(false);
}

const calculate = (chained) => {
    if (!operator || !secondNumber) {
        return;
    }
    const result = roundNumber(operate(operator, Number(firstNumber), Number(secondNumber)));
    console.log(result);
    if (Number.isNaN(result)) {
        updateDisplay("Invalid Operation");
        reset();
        return;
    }
    reset();
    if (chained) {
        firstNumber = String(result);
    }
    updateDisplay(result);
}

equalsButton.addEventListener("click", onEqualsClick);


const dotButton = document.querySelector("#dot");

const onDotButtonClick = (e) => {
    if (operator && !secondNumber.includes(".")) {
        secondNumber += ".";
        updateDisplay(secondNumber);
        return;
    }

    if (!firstNumber.includes(".")) {
        firstNumber += ".";
        updateDisplay(firstNumber);
    }
}

dotButton.addEventListener("click", onDotButtonClick);

const roundNumber = (num) => Math.round(num * 1000) / 1000;

const clearButton = document.querySelector("#clear-button");

clearButton.addEventListener("click", () => {
    reset();
    updateDisplay("0");
})