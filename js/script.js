import './theme.js';
import format from '../node_modules/number-format.js/lib/format.esm.js';

import { del, reset, equal, buttonsContainer } from './theme.js';

const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

class Calculator {
  constructor(previousOperandEL, currentOperandEl) {
    this.previousOperandEL = previousOperandEL;
    this.currentOperandEl = currentOperandEl;
    this.reset();
  }

  reset() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  appendNumber(number) {
    if (this.currentOperand.includes('.') && number === '.') return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    console.log(this.currentOperand);
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  displayOutput() {
    this.currentOperandEl.innerText = this.getDisplayNumber(
      this.currentOperand
    );

    if (this.operation != null) {
      this.previousOperandEL.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  selectOperator(operator) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') this.compute();

    previousOperand.classList.remove('hide-previous-operand');
    this.operation = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation = null;
    let previousNumber = parseFloat(this.previousOperand);
    let currentNumber = parseFloat(this.currentOperand);

    if (isNaN(previousNumber) || isNaN(currentNumber)) return;

    switch (this.operation) {
      case '+':
        computation = previousNumber + currentNumber;
        break;
      case '-':
        computation = previousNumber - currentNumber;
        break;
      case '/':
        computation = previousNumber / currentNumber;
        break;
      case 'x':
        computation = previousNumber * currentNumber;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.previousOperand = '';
  }
}

const calculator = new Calculator(previousOperand, currentOperand);

buttonsContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('data-number')) return;
  calculator.appendNumber(e.target.innerText);
  calculator.displayOutput();
});

del.addEventListener('click', () => {
  calculator.delete();
  calculator.displayOutput();
});

reset.addEventListener('click', () => {
  calculator.reset();
  calculator.displayOutput();
});

buttonsContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('data-operator')) return;
  calculator.selectOperator(e.target.innerText);
  calculator.displayOutput();
});

equal.addEventListener('click', () => {
  calculator.compute();
  calculator.displayOutput();
  previousOperand.classList.add('hide-previous-operand');
});
