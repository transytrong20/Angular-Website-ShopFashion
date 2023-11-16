import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPasswordModel } from 'src/app/Models/ResetPasswordModel';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseUrl: string = 'https://aspnetcore6-api-shopfashion.azurewebsites.net/shop/data/'

  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.baseUrl}user/send-reset-email/${email}`, {})
  }

  resetPassword(resetPasswordObj: ResetPasswordModel) {
    return this.http.post<any>(`${this.baseUrl}user/reset-password`, resetPasswordObj)
  }
}
