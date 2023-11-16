import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PangingCategoryModel } from 'src/app/Models/PangingCategoryModel';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseUrl: string = 'https://aspnetcore6-api-shopfashion.azurewebsites.net/shop/data/';

  constructor(
    private http: HttpClient
  ) { }

  allCategory() {
    return this.http.get<any[]>(`${this.baseUrl}category/all`);
  }

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
}
