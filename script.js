
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
    operator = e.target.id;
    updateDisplay(e.target.textContent);
}

keyboardOperatorButtons.forEach((button) => button.addEventListener("click", onOperatorClick));

const equalsButton = document.querySelector("#equals");

const reset = () => {
    firstNumber = "";
    secondNumber = "";
    operator = "";
}

const onEqualsClick = (e) => {
    if (!operator || !secondNumber) {
        return;
    }
    const result = operate(operator, Number(firstNumber), Number(secondNumber));
    if (Number.isNaN(result)) {
        updateDisplay("Invalid Operation");
        reset();
        return;
    }
    firstNumber = String(result);
    secondNumber = "";
    operator = "";
    updateDisplay(result);
}

equalsButton.addEventListener("click", onEqualsClick);
