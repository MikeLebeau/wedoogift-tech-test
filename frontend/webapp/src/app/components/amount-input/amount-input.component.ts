import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {CardCombination, ShopService} from "../../services/shop.service";
import {BehaviorSubject} from "rxjs";
import {MatDialog} from '@angular/material/dialog';
import {DialogChoiceComponent} from "../dialog-choice/dialog-choice.component";

const SHOP_ID = 5;

@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss']
})
export class AmountInputComponent {

  desiredAmountControl = new FormControl(0);
  alreadyAskedCombination: BehaviorSubject<CardCombination[]> = new BehaviorSubject<CardCombination[]>([]);

  constructor(private dialog: MatDialog, private shopService: ShopService) { }

  getCardCombination() {
    this.shopService.getCombination(SHOP_ID, this.desiredAmountControl.value).subscribe(cardCombination => {
      if(cardCombination.equal) {
        this.addNewKnownCombination(cardCombination);
      } else {
        this.openChoice(+this.desiredAmountControl.value, cardCombination.floor?.value, cardCombination.ceil?.value);
      }
    })
  }

  private addNewKnownCombination(cardCombination: CardCombination) {
    this.alreadyAskedCombination.next([...this.alreadyAskedCombination.value, cardCombination])
  }

  private openChoice(desiredAmount: number, floorAmount: number, ceilAmount: number){
    const dialogRef = this.dialog.open(DialogChoiceComponent, {
      data: {
        desiredAmount,
        floorAmount,
        ceilAmount,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.desiredAmountControl.setValue(result);
        this.getCardCombination();
      }
    });
  }
}
