import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/Helpers/validationform';
import { LoginService } from 'src/app/services/login/login.service';
import { UserStoreService } from 'src/app/services/users/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  type: string = 'password'
  isText: boolean = false
  eyeIcon: string = 'fa-eye-slash'
  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: LoginService,
    private router: Router,
    private userStore: UserStoreService,
    private toast: NgToastService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  // onLogin() {
  //   if (this.loginForm.valid) {
  //     console.log(this.loginForm.value)
  //     this.auth.login(this.loginForm.value).subscribe({
  //       next:(res)=>{
  //         alert(res.message);
  //         this.loginForm.reset();
  //         this.router.navigate(['']);
  //       },
  //       error:(err)=>{
  //         alert(err?.error.message)
  //       }
  //     })
  //   }
  //   else {
  //     console.log("Form is not valid")
  //     this.validateAllFormFileds(this.loginForm)
  //     alert("Your form is invalid")
  //   }
  // }
  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value).subscribe(
        {
          next: (res) => {
            console.log(res.message);

            this.loginForm.reset();
            this.auth.storeToKen(res.data.token);

            // this.auth.storeRefreshToken(res.refreshToken)
            const roleName = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"
            const nameUser = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/username"
            const tokenPayload = this.auth.decodedToken();
            this.userStore.setFullNameForStore(tokenPayload[nameUser])
            this.userStore.setRoleForStore(tokenPayload[roleName])

            if ((tokenPayload[roleName] == 'admin')) {
              // Kiểm tra nếu người dùng có vai trò "admin"
              this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
              this.router.navigate(['admin']);
              // this.cookieService.put("adminInfor", res.accessToken)

            } else if ((tokenPayload[roleName] == '["user"]')) {
              // Kiểm tra nếu người dùng có vai trò "user"
              this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
              this.router.navigate(['home']);
              // this.cookieService.put("userInfor", res.accessToken)
            } else {
              // Xử lý cho các trường hợp khác
            }
          },
          error: (err) => {
            alert(err.error.message)
            this.toast.error({ detail: "ERROR", summary: "Something when wrong!", duration: 5000 });
            console.log(err)
          }
        }
      )
    }
    else {
      ValidateForm.validateAllFormFields(this.loginForm)
      alert('You form is invalid');
      this.loginForm.reset;
    }

  }


  private validateAllFormFileds(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(filed => {
      const control = formGroup.get(filed)
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true })
      }
      else if (control instanceof FormGroup) {
        this.validateAllFormFileds(control)
      }
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
}
