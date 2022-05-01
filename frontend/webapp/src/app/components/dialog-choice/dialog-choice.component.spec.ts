import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChoiceComponent } from './dialog-choice.component';
import {ShopService} from "../../services/shop.service";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('DialogChoiceComponent', () => {
  let component: DialogChoiceComponent;
  let fixture: ComponentFixture<DialogChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogChoiceComponent ],
      imports: [
        MatDialogModule,
      ],
      providers: [
        { provide: ShopService },
        { provide: MAT_DIALOG_DATA, useValue: {
            data: {}
          } },
        {
          provide: MatDialogRef,
          useValue: {}
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
