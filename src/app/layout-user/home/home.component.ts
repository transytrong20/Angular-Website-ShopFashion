import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UserStoreService } from 'src/app/services/users/user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  product!: any;
  seller!: any;
  public users: any = [];
  public name: string = '';
  role!: string;

  constructor(
    private productService: HomeService,
    private auth: LoginService,
    private userStore: UserStoreService,
  ){}

  public ngOnInit() {
    const product = {};
    this.productService.getListProduct(product).subscribe(
      (data) => {
        this.product = data;
        console.log('GetListProduct', data);
      }
    );

    const seller = {};
    this.productService.getBestSeller(seller).subscribe(
      (data) => {
        this.seller = data;
        console.log('GetBestSeller', data);
      }
    );

    this.auth.getUsersInfo().subscribe(res => {
      this.users = res;
      console.log('User Info',res)
    });
    this.userStore.getFullNameFromStore().subscribe(val => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      // let fullNameFromToken = this.auth.getRoleFromToken();
      this.name = val || fullNameFromToken
    });
    this.userStore.getRoleFromStore().subscribe(val => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  public products() {
    const product = {};
    this.productService.getListProduct(product).subscribe(
      (data) => {
        this.product = data;
        console.log('GetListProduct', data);
      }
    );

    const seller = {};
    this.productService.getBestSeller(seller).subscribe(
      (data) => {
        this.seller = data;
        console.log('GetBestSeller', data);
      }
    );
  }

  logout() {
    this.auth.signOut();
  }

}
