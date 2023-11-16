import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmPasswordValidator } from 'src/app/Helpers/confirm-password.validator';
import ValidateForm from 'src/app/Helpers/validationform';
import { ResetPasswordModel } from 'src/app/Models/ResetPasswordModel';
import { ResetPasswordService } from 'src/app/services/resetPassword/reset-password.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {
  public resetForm!: FormGroup
  public resetPasswordEmail!: string
  public isValidEmail!: boolean
  type: string = 'password'
  isText: boolean = false
  eyeIcon: string = 'fa-eye-slash'
  passwordsMatchError: boolean = false;

  emailToReset!: string
  emailToken!: string
  resetPasswordObj = new ResetPasswordModel()

  constructor(
    private fb: FormBuilder,
    private toast: NgToastService,
    private router: Router,
    private reset: ResetPasswordService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })

    this.activatedRoute.queryParams.subscribe(val=>{
      // this.emailToReset = val['email']
      let uriToken = val['code']
      this.emailToken = uriToken.replace(/ /g,'+')
      console.log(this.emailToken)
      // console.log(this.emailToReset)
    })
  }

  resetPassword(){
    if(this.resetForm.valid){
      this.resetPasswordObj.emailToken = this.emailToken
      this.resetPasswordObj.email = this.resetForm.value.email
      this.resetPasswordObj.newPassword = this.resetForm.value.newPassword
      this.resetPasswordObj.confirmPassword = this.resetForm.value.confirmPassword

      this.reset.resetPassword(this.resetPasswordObj).subscribe({
        next:(res)=> {
          this.toast.success({
            detail: 'Succes',
            summary: 'Password Reset Succes',
            duration: 500
          });
          this.router.navigate(['login'])
        },
        error:(err)=> {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Something went wrong!',
            duration: 500
          });
        },
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.resetForm)
    }
  }
  
  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    this.isValidEmail = pattern.test(value)
    return this.isValidEmail
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  checkConfirmPassword(): boolean {
    const password = this.resetForm.get('newPassword')!.value;
    const confirmPassword = this.resetForm.get('confirmPassword')!.value;
    const passwordsMatch = password === confirmPassword;
    this.passwordsMatchError = !passwordsMatch;
    return passwordsMatch;
  }
}
