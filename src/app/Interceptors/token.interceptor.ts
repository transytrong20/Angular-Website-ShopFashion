import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { TokenApiModel } from '../Models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: LoginService,
    private toast: NgToastService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` } // 'Bearer '(token)
      })
    }
    // return request.
    return next.handle(request).pipe(catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // this.toast.warning({ detail: 'warning', summary: 'Token is expired, Login again' })
          // this.router.navigate(['login'])

          //handle
          return this.handleUnAuthorizedError(request,next);
        }
      }
      return throwError(() =>new Error('Some other error occurred'))
    }));
  }
  
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    let tokeApiModel = new TokenApiModel();
    tokeApiModel.accessToken = this.auth.getToken()!;
    tokeApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokeApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToKen(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization:`Bearer ${data.accessToken}`}  // "Bearer "+myToken
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          // this.toast.warning({detail:"Warning", summary:"Please Login again"});
          // this.router.navigate(['login'])
        })
      })
    )
  }
}
