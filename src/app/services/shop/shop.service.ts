import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PangingCategoryModel, ShopProductModel } from 'src/app/Models/Shop-Service-Model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseUrl: string = 'https://localhost:7159/shop/data/';

  constructor(
    private http: HttpClient
  ) { }

//get all category
  allCategory() {
    return this.http.get<any[]>(`${this.baseUrl}category/all`);
  }

  //get paging all product
  allProduct(obj : PangingCategoryModel){
    let params = new HttpParams()
      .set('pageSize', obj.PageSize)
      .set('pageIndex', obj.PageIndex)
      .set('sortBy', obj.SortBy)
      .set('direction', obj.Direction)
      .set('searchKey', obj.SearchKey)
      .set('categoryId', obj.CategoryId)
      .set('accepted', obj.Accepted);
    return this.http.get<any>(`${this.baseUrl}product/paging`, { params });
  }

  //product get by id 
  ProductById(id: string) {
    let params = new HttpParams().set('productId', id)
    return this.http.get<any>(`${this.baseUrl}product/get/${id}`, { params });
  }

  //call 4 item product softby sold
  public getBestSeller(payload: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetlistProductSaleTurn`, payload)
  }

  //call 4 item similar product
  public similarProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/similarProduct/${id}`)
  }
}
