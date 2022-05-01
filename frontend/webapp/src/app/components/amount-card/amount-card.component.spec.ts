import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountCardComponent } from './amount-card.component';

describe('AmountCardComponent', () => {
  let component: AmountCardComponent;
  let fixture: ComponentFixture<AmountCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
