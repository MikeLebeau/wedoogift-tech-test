import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

interface CalculatorComponentValue {
  value: number;
  cards: number[];
}

export interface CardCombination {
  equal?: CalculatorComponentValue,
  floor?: CalculatorComponentValue,
  ceil?: CalculatorComponentValue
}

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private readonly BASE_URL = "http://localhost:30001";

  constructor(private http: HttpClient) { }

  getCombination(shopId: number, desiredAmount: number): Observable<CardCombination> {
    const headers = new HttpHeaders()
      .set('Authorization', 'tokenTest123')
      .set('Accept', 'application/json');

    const params = new HttpParams()
      .set('amount', `${desiredAmount}`);

    return this.http.get<CardCombination>(this.BASE_URL + `/shop/${shopId}/search-combination`, {headers, params});
  }
}
