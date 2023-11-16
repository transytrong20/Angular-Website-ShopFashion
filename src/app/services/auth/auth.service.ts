import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://aspnetcore6-api-shopfashion.azurewebsites.net/shop/data/';
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}user/CreateUser`, userObj)
  }

  signIn(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}auth/login`,loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['home'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  getToken(){
    return localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getUsersInfo() {
    return this.http.get<any>(`${this.baseUrl}user/userinfo`);
  }
}
