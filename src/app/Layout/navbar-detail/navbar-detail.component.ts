import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home/home.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UserStoreService } from 'src/app/services/users/user-store.service';

@Component({
  selector: 'app-navbar-detail',
  templateUrl: './navbar-detail.component.html',
  styleUrls: ['./navbar-detail.component.scss']
})
export class NavbarDetailComponent {
  public users: any = [];
  public username: string = '';
  role!: string;

  constructor(
    private productService: HomeService,
    private auth: LoginService,
    private userStore: UserStoreService,
    private active: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.auth.getUsersInfo().subscribe(res => {
      this.users = res;
      console.log('User Info', res)
    });
    this.userStore.getFullNameFromStore().subscribe(val => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      // let fullNameFromToken = this.auth.getRoleFromToken();
      this.username = val || fullNameFromToken
    });
    this.userStore.getRoleFromStore().subscribe(val => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  logout() {
    this.auth.signOut();
  }
}
