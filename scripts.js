const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
)


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calculate() {
        let result;

        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);

        // Verificação se é ou número na calculadora
        if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;
        // Calculos matemáticos
        switch (this.operation) {
            case "+":
                result = _previousOperand + _currentOperand;
                break;

            case "-":
                result = _previousOperand - _currentOperand;
                break;

            case "÷":
                result = _previousOperand / _currentOperand;
                break

            case "x":
                result = _previousOperand * _currentOperand;
                break

            default:
                return;
        }
        // Resultado
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    //Escolha da operações matemáticas
    chooseOperation(operation) {
        if (this.previousOperand != '') {
            this.calculate()
        }

        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }


    appendNumber(number) {
        if (this.currentOperand.includes(".")  && number == ".") return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${
            this.operation || ""
        }`;
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}


for (const operationButton of operatorButtons) {
    operationButton.addEventListener("click", () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay()
    });
}


allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsButtons.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});

deleteButtons.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});