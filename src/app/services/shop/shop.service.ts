import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseUrl: string = 'https://aspnetcore6-api-shopfashion.azurewebsites.net/shop/data/category/';

  constructor(
    private http: HttpClient
  ) { }

  allCategory() {
    return this.http.get<any[]>(`${this.baseUrl}all`);
  }
}
