import { TestBed } from '@angular/core/testing';

import {CardCombination, ShopService} from './shop.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('ShopService', () => {
  let service: ShopService;
  let httpMock: HttpTestingController;
  let httpClientMock: HttpClient;

  let shopId = 5;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    }).compileComponents();

    service = TestBed.inject(ShopService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClientMock = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get an available cards combination', () => {
    const desiredAmount = 70;

    const expectedResult: CardCombination = {
      equal: {
        value: 70,
        cards: [
          35,
          35
        ]
      },
      floor: {
          value: 70,
        cards: [
          35,
          35
        ]
      },
      ceil: {
        value: 70,
        cards: [
          35,
          35
        ]
      }
    };

    service.getCombination(shopId, desiredAmount).subscribe((combinationCard) => {
      expect(combinationCard).toBe(expectedResult);
    });

    const req = httpMock.expectOne('http://localhost:30001/shop/5/search-combination?amount=70');
    expect(req.request.method).toBe('GET');
    req.flush(expectedResult);
    httpMock.verify();
  });

  it('should get a ceil and a floor combination', () => {
    const shopId = 5;
    const desiredAmount = 66;

    const expectedResult: CardCombination = {
      ceil: {
        value: 70,
        cards: [35, 35]
      },
      floor: {
        value: 57,
        cards: [35, 22]
      }
    };

    service.getCombination(shopId, desiredAmount).subscribe((combinationCard) => {
      expect(combinationCard).toBe(expectedResult);
    });

    const req = httpMock.expectOne('http://localhost:30001/shop/5/search-combination?amount=66');
    expect(req.request.method).toBe('GET');
    req.flush(expectedResult);
    httpMock.verify();
  });

  it('should get only a floor combination', () => {
    const shopId = 5;
    const desiredAmount = 660;

    const expectedResult: CardCombination = {
      floor: {
        value: 57,
        cards: [35, 22]
      }
    };

    service.getCombination(shopId, desiredAmount).subscribe((combinationCard) => {
      expect(combinationCard).toBe(expectedResult);
    });

    const req = httpMock.expectOne('http://localhost:30001/shop/5/search-combination?amount=660');
    expect(req.request.method).toBe('GET');
    req.flush(expectedResult);
    httpMock.verify();
  });
});
