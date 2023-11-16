import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout-login/login/login.component';
import { SignupComponent } from './layout-login/signup/signup.component';
import { ForgotComponent } from './layout-login/forgot/forgot.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './layout-user/home/home.component';
import { ShopComponent } from './layout-user/shop/shop.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { NavbarHomeComponent } from './Layout/navbar-home/navbar-home.component';
import { NavbarDashboardComponent } from './Layout/navbar-dashboard/navbar-dashboard.component';
import { FooterHomeComponent } from './Layout/footer-home/footer-home.component';
import { FooterDashboardComponent } from './Layout/footer-dashboard/footer-dashboard.component';
import { NavbarLoginComponent } from './Layout/navbar-login/navbar-login.component';
import { ResetComponent } from './layout-login/reset/reset.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    HomeComponent,
    ShopComponent,
    NavbarHomeComponent,
    NavbarDashboardComponent,
    FooterHomeComponent,
    FooterDashboardComponent,
    NavbarLoginComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgToastModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
