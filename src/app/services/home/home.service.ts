import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl: string = 'https://localhost:7159/shop/data/product'
  // private baseUrl: string = 'https://localhost:7159/shop/data/product'
  constructor(private http: HttpClient) { }

  //call 6 item product softby id
  public getListProduct(payload: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getlistProduct`, payload)
  }

  //call 4 item product softby sold
  public getBestSeller(payload: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetlistProductSaleTurn`, payload)
  }
}
