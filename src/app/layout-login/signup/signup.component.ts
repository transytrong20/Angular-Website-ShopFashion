import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  type: string = 'password'
  isText: boolean = false
  eyeIcon: string = 'fa-eye-slash'
  signUp!: FormGroup
  passwordsMatchError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: LoginService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.signUp = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      roleId: "9fdf3383-125f-4b87-a8d9-9e235a4e3652",
    })
  }
  onSubmit() {
    if (this.signUp.valid) {
      console.log(this.signUp.value);
      this.auth.signUp(this.signUp.value).subscribe({
        next:(res)=>{
          alert(res.message)
          this.signUp.reset()
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
      if (this.checkConfirmPassword()) {
      } else {
        alert("Passwords do not match");
      }
    } else {
      this.validateAllFormFields(this.signUp);
      alert("Your form is invalid");
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true })
      }
      else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
      if (field === 'confirmPassword' && this.passwordsMatchError) {
        control?.setErrors({ passwordsMatch: true });
      }
    })
  }
  checkConfirmPassword(): boolean {
    const password = this.signUp.get('password')!.value;
    const confirmPassword = this.signUp.get('confirmPassword')!.value;
    const passwordsMatch = password === confirmPassword;
    this.passwordsMatchError = !passwordsMatch;
    return passwordsMatch;
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
}
