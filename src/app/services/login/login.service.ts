import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = 'https://shop-webapp-api.azurewebsites.net/shop/data/'
  //https://shop-webapp-api.azurewebsites.net/shop/data/auth/login
  //https://shop-webapp-api.azurewebsites.net/shop/data/user/CreateUser

  constructor(
    private http: HttpClient) { }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}user/CreateUser`,userObj)
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}auth/login`,loginObj)
  }
}
