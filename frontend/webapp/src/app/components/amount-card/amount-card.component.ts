import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-amount-card',
  templateUrl: './amount-card.component.html',
  styleUrls: ['./amount-card.component.scss']
})
export class AmountCardComponent {

  @Input() amount: number = 0;
  @Input() cards: number[] = [];
}
