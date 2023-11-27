import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout-login/login/login.component';
import { SignupComponent } from './layout-login/signup/signup.component';
import { ForgotComponent } from './layout-login/forgot/forgot.component';
import { HomeComponent } from './layout-user/home/home.component';
import { ShopComponent } from './layout-user/shop/shop.component';
import { AuthGuard } from './services/guards/auth.guard';
import { ResetComponent } from './layout-login/reset/reset.component';
import { DetailComponent } from './layout-user/detail/detail.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'shop', component: ShopComponent},
  {path:'shop/:id', component: ShopComponent},
  {path:'detail', component: DetailComponent},
  {path:'detail/:id', component: DetailComponent},
  {path:'signup', component: SignupComponent},
  {path:'forgot', component: ForgotComponent},
  {path:'reset', component: ResetComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'**', redirectTo:'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
