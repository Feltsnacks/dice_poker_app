import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Dice } from './dice.model';
import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  diceArray: Array<Dice>;
  gameState = 1;
  numberOfDices = 5;
  result: string;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {}

  nextRound() {
    switch (this.gameState) {
      case 1:
        this.diceArray = new Array<Dice>(this.numberOfDices);
        for (let index = 0; index < this.diceArray.length; index++) {
          const diceObj = new Dice();
          diceObj.value = this.randomDiceValue();
          diceObj.selected = false;
          this.diceArray[index] = diceObj;
        }
        this.gameState = 2;
        break;
      case 2:
        this.diceArray.forEach((dice) => {
          if (!dice.selected) {
            dice.value = this.randomDiceValue();
          }
          dice.selected = false;
        });
        this.gameState = 3;
        break;
      case 3:
        this.evaluateResult();
        this.gameState = 4;
        break;
      default:
        this.diceArray = null;
        this.gameState = 1;
        this.result = '';
        break;
    }
  }

  randomDiceValue(): number {
    return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  }

  evaluateResult() {
    const valueArray = new Array<number>(this.numberOfDices);
    for (let index = 0; index < this.diceArray.length; index++) {
      valueArray[index] = this.diceArray[index].value;
    }

    if (this.quoteService.fiveOfAKind(valueArray)) {
      this.result = 'Five of a kind';
    } else if (this.quoteService.fourOfAKind(valueArray)) {
      this.result = 'Four of a kind';
    } else if (this.quoteService.fullHouse(valueArray)) {
      this.result = 'Full house';
    } else if (this.quoteService.sixHighStraight(valueArray)) {
      this.result = 'Six High Straight';
    } else if (this.quoteService.fiveHighStraight(valueArray)) {
      this.result = 'Five High Straight';
    } else if (this.quoteService.threeOfAKind(valueArray)) {
      this.result = 'Thee of a kind';
    } else if (this.quoteService.twoPair(valueArray)) {
      this.result = 'Two pair';
    } else if (this.quoteService.pair(valueArray)) {
      this.result = 'Pair';
    }
  }
}
