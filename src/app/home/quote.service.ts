import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Dice } from './dice.model';

const routes = {
  quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`,
};

export interface RandomQuoteContext {
  // The quote's category: 'dev', 'explicit'...
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  countObj: any;

  constructor(private httpClient: HttpClient) {}

  fiveOfAKind(diceArray: number[]): boolean {
    for (let i = 0; i <= 1; i++) {
      let count = 1;
      for (let j = i + 1; j < diceArray.length; j++) {
        if (diceArray[i] === diceArray[j]) count++;
      }
      if (count === 5) return true;
    }
    return false;
  }

  fourOfAKind(diceArray: number[]): boolean {
    for (let i = 0; i <= 1; i++) {
      let count = 1;
      for (let j = i + 1; j < diceArray.length; j++) {
        if (diceArray[i] === diceArray[j]) count++;
      }
      if (count === 4) {
        return true;
      }
    }
    return false;
  }

  fullHouse(diceArray: number[]): boolean {
    const countObj = {};
    for (const x of diceArray) {
      countObj[x] = (countObj[x] || 0) + 1;
    }
    const vals = Object.values(countObj);
    const keys = Object.keys(countObj);
    if ((vals[0] === 2 && vals[1] === 3) || (vals[1] === 2 && vals[0] === 3)) {
      return true;
    }
    return false;
  }

  sixHighStraight(diceArray: number[]): boolean {
    // if diceArr === 2,3,4,5,6. There should always be a 6, never a 1 and every dice should be different
    if (
      diceArray.includes(2) &&
      diceArray.includes(3) &&
      diceArray.includes(4) &&
      diceArray.includes(5) &&
      diceArray.includes(6)
    ) {
      return true;
    }
    return false;
  }

  fiveHighStraight(diceArray: number[]): boolean {
    // if diceArr === 1,2,3,4,5. There should never be a 6 and every dice should be different
    if (
      diceArray.includes(1) &&
      diceArray.includes(2) &&
      diceArray.includes(3) &&
      diceArray.includes(4) &&
      diceArray.includes(5)
    ) {
      return true;
    }
    return false;
  }

  threeOfAKind(diceArray: number[]): boolean {
    for (let i = 0; i <= 3; i++) {
      let count = 1;
      for (let j = i + 1; j < diceArray.length; j++) {
        if (diceArray[i] === diceArray[j]) count++;
      }
      if (count === 3) return true;
    }
    return false;
  }

  twoPair(diceArray: number[]): boolean {
    const countObj = {};
    for (const x of diceArray) {
      countObj[x] = (countObj[x] || 0) + 1;
    }
    const vals = Object.values(countObj);
    if (vals.filter((x) => x === 2).length === 2) {
      return true;
    }
    return false;
  }

  pair(diceArray: number[]): boolean {
    for (let i = 0; i < diceArray.length; i++) {
      let count = 1;
      for (let j = i + 1; j < diceArray.length; j++) {
        if (diceArray[i] === diceArray[j]) count++;
      }
      if (count === 2) {
        return true;
      }
    }
    return false;
  }
}
