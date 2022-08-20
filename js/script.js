import './theme.js';
import { del, reset, equal, buttonsContainer } from './theme.js';
import format from '../node_modules/number-format.js/lib/format.esm.js';

const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

class Calculator {
  constructor(previousOperandEl, currentOperandEl) {
    this.previousOperandEl = previousOperandEl;
    this.currentOperandEl = currentOperandEl;
    this.resetCalc();
  }

  updateInputField({ prev, current }) {
    this.previousOperandEl.innerHTML = prev;
    this.currentOperandEl.innerHTML = current;
    if (this.operation !== null) {
      this.previousOperandEl.innerHTML = `${prev} ${this.operation}`;
    }
  }

  appendNumber(number) {
    if (this.currentOperandEl.innerHTML.includes('.') && number === '.') return;

    this.currentOperandEl.innerHTML = format(
      '#,##0.####',
      this.currentOperandEl.innerHTML.toString() + number
    );
  }

  resetCalc() {
    this.previousOperandEl.innerHTML = '';
    this.currentOperandEl.innerHTML = '';
  }

  delete() {
    this.currentOperandEl.innerHTML = this.currentOperandEl.innerHTML.slice(
      0,
      -1
    );
  }

  selectOperator(operator) {
    if (this.currentOperandEl.innerHTML === '') return;
    if (this.previousOperandEl.innerHTML !== '') this.compute();

    previousOperand.classList.remove('hide-previous-operand');
    this.operation = operator;
    this.previousOperandEl.innerHTML = this.currentOperandEl.innerHTML;
    this.currentOperandEl.innerHTML = '';
  }

  compute() {
    let evaluation = null;
    let previousNumber = parseFloat(this.previousOperandEl.innerHTML);
    let currentNumber = parseFloat(this.currentOperandEl.innerHTML);

    if (isNaN(previousNumber) || isNaN(currentNumber)) return;

    switch (this.operation) {
      case '+':
        evaluation = previousNumber + currentNumber;
        break;
      case '-':
        evaluation = previousNumber - currentNumber;
        break;
      case 'x':
        evaluation = previousNumber * currentNumber;
        break;
      case '/':
        evaluation = previousNumber / currentNumber;
        break;
      default:
        return;
    }

    this.currentOperandEl.innerHTML = format('#,##0.####', evaluation);
    this.previousOperandEl.innerHTML = '';
  }
}

const calculator = new Calculator(previousOperand, currentOperand);

buttonsContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('data-number')) return;
  calculator.appendNumber(e.target.innerHTML);
});

del.addEventListener('click', () => {
  calculator.delete();
});

reset.addEventListener('click', () => {
  calculator.resetCalc();
});

buttonsContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('data-operator')) return;
  calculator.selectOperator(e.target.innerHTML);
  calculator.updateInputField({
    prev: previousOperand.innerHTML,
    current: currentOperand.innerHTML,
  });
});

equal.addEventListener('click', () => {
  calculator.compute();
  previousOperand.classList.add('hide-previous-operand');
});
