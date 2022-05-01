import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogChoiceData {
  desiredAmount: number;
  floorAmount?: number;
  ceilAmount?: number;
}

@Component({
  selector: 'app-dialog-choice',
  templateUrl: './dialog-choice.component.html',
  styleUrls: ['./dialog-choice.component.scss']
})
export class DialogChoiceComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogChoiceData,
    private dialogRef: MatDialogRef<DialogChoiceComponent>,
  ) {
  }

  getNewCombination(newAmount: number) {
    this.dialogRef.close(newAmount);
  }
}
