import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from 'src/app/Models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = 'https://aspnetcore6-api-shopfashion.azurewebsites.net/shop/data/'
  private userPayload:any;

  constructor(
    private http: HttpClient,
    private router: Router
    ) { 
      this.userPayload = this.decodedToken();
    }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}user/CreateUser`,userObj)
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}auth/login`,loginObj)
  }

  getUsersInfo() {
    return this.http.get<any>(`${this.baseUrl}user/userinfo`);
  }

  storeToKen(tokenValue: string) {
    console.log(tokenValue);
    localStorage.setItem('token', tokenValue)
  }
  
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['home'])
  }

  getfullNameFromToken() {
    if (this.userPayload)
      return this.userPayload.name;
  }

  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(`${this.baseUrl}User/refresh`, tokenApi)
  }

  //info User
  InfoUserById(id: string) {
    const url = `${this.baseUrl}User/InfoUserById?Id=${id}`;
    return this.http.post<any>(url, id)
  }

  
}
