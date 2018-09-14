import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  leftResult: number;
  rightResult: number;
  didAction: boolean;
  currentAction: string;
  displayMessage: string;
  pressedEnter: boolean;
  result: number;

  constructor() {
    this.didAction = false;
    this.leftResult = 0;
    this.rightResult = 0;
    this.pressedEnter = false;
    this.result = 0;
  }

  ngOnInit() {
  }

  private displayCalculation(): void {
    if (this.didAction) {
      this.displayMessage = this.leftResult + ' ' + this.currentAction + ' ' + this.rightResult;
    } else {
      this.displayMessage = this.leftResult + '';
    }
  }

  public calculateResult(number: number): void {
    if (this.pressedEnter) {
      this.resetEverything();
      this.pressedEnter = false;
    }
    if (!this.didAction) {
      this.leftResult = this.leftResult * 10 + number;
    } else {
      this.rightResult = this.rightResult * 10 + number;
    }
    this.displayCalculation();
  }

  public doAction(symbol: string): void {
    if (symbol === 'C') {
      this.resetEverything();
      return;
    }
    if (this.didAction && symbol  === '=') {
      this.result = this.calculateWithSymbol();
      this.displayMessage = '' + this.result;
      this.pressedEnter = true;
    }
    if (!this.didAction) {
      this.currentAction = symbol;
      this.displayMessage = this.leftResult + ' ' + this.currentAction;
      this.didAction = true;
    }
  }

  private calculateWithSymbol(): number {
    let result = 0;
    switch (this.currentAction) {
      case '+':
        result = this.leftResult + this.rightResult;
        break;
      case '-':
        result = this.leftResult - this.rightResult;
        break;
      case '/':
        result = this.leftResult / this.rightResult;
        break;
      case '*':
        result = this.leftResult * this.rightResult;
        break;
      case 'C':
        this.resetEverything();
        break;
      default:
        this.displayMessage = 'Error';
    }
    return result;
  }

  private resetEverything(): void {
    this.leftResult = null;
    this.rightResult = null;
    this.displayMessage = '';
    this.didAction = false;
    this.currentAction = '';
    this.result = 0;
  }
}
