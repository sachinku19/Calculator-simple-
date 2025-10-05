const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const history = document.getElementById("history");

let firstOperand = null;
let operator = null;
let waitForSecondOperand = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Clear
    if (value === "C") {
      display.textContent = "0";
      firstOperand = null;
      operator = null;
      waitForSecondOperand = false;
      return;
    }

    // ± toggle sign
    if (value === "±") {
      if (display.textContent !== "0") {
        display.textContent = String(parseFloat(display.textContent) * -1);
      }
      return;
    }

    // % percentage
    if (value === "%") {
      display.textContent = String(parseFloat(display.textContent) / 100);
      return;
    }

    // Operators
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      firstOperand = parseFloat(display.textContent);
      operator = value;
      waitForSecondOperand = true;
     history.textContent = `${firstOperand} ${operator}`;      return;
    }

    // Equal
    if (value === "=") {
      if (operator && firstOperand !== null) {
        const secondOperand = parseFloat(display.textContent);
        let result;

        switch (operator) {
          case "+":
            result = firstOperand + secondOperand;
            break;
          case "-":
            result = firstOperand - secondOperand;
            break;
          case "*":
            result = firstOperand * secondOperand;
            break;
          case "/":
            result = secondOperand !== 0 ? firstOperand / secondOperand : "Error";
            break;
        }

        display.textContent = result;
        firstOperand = result;
        operator = null;
        waitForSecondOperand = true;
        history.textContent = ""; // Clear the history after calculation

      }
      return;
    }

    // Numbers and Decimal
    if (!isNaN(value) || value === ".") {
      if (waitForSecondOperand) {
        display.textContent = value;
        waitForSecondOperand = false;
      } else {
        display.textContent =
          display.textContent === "0" ? value : display.textContent + value;
      }
    }
  });
});
