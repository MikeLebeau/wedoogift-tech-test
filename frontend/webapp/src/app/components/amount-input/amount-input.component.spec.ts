import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountInputComponent } from './amount-input.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CardCombination, ShopService} from "../../services/shop.service";
import {HttpClient} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";

describe('AmountInputComponent', () => {
  let component: AmountInputComponent;
  let fixture: ComponentFixture<AmountInputComponent>;

  let httpMock: HttpTestingController;
  let httpClientMock: HttpClient;

  let shopServiceSpy: jasmine.SpyObj<ShopService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AmountInputComponent,
      ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ShopService, useValue: jasmine.createSpyObj('ShopService', ['getCombination']) },
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open', 'afterClose'])}
      ]
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    httpClientMock = TestBed.inject(HttpClient);
    shopServiceSpy = TestBed.inject(ShopService) as jasmine.SpyObj<ShopService>;
    dialogRefSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a new known combination', () => {
    const randomCombination: CardCombination = {
      equal: {
        value: 70,
        cards: [35, 35]
      }
    };
    component.alreadyAskedCombination.next([randomCombination]);

    const newCardCombination: CardCombination = {
      equal: {
        value: 70,
        cards: [35, 35]
      }
    };

    const expectedKnownCombination: CardCombination[] = [
      randomCombination,
      newCardCombination
    ];

    shopServiceSpy.getCombination.and.returnValue(of(newCardCombination))

    component.desiredAmountControl.setValue(57);
    component.getCardCombination();

    expect(component.alreadyAskedCombination.value).toEqual(expectedKnownCombination);
  });

  it('should open the choice dialog', () => {
    const randomCombination: CardCombination = {
      equal: {
        value: 70,
        cards: [35, 35]
      }
    };
    const newCardCombination: CardCombination = {
      ceil: {value: 57, cards: [35, 22]},
      floor: {value: 55, cards: [35, 20]}
    };
    component.alreadyAskedCombination.next([randomCombination]);
    shopServiceSpy.getCombination.and.returnValue(of(newCardCombination));

    component.desiredAmountControl.setValue(56);
    component.getCardCombination();

    expect(dialogRefSpy.open.calls.count()).toBe(1);
  });
});
