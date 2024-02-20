import {
  // AfterViewInit,
  Component
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ResetPasswordService } from 'src/app/services/resetPassword/reset-password.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent
// implements AfterViewInit 
{
  public forgotForm!: FormGroup
  public resetPasswordEmail!: string
  public isValidEmail!: boolean

  constructor(
    private fb: FormBuilder,
    private toast: NgToastService,
    private router: Router,
    private reset: ResetPasswordService
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', Validators.required]
    })
  }
  // ngAfterViewInit(): void {
  //   const the = document.createElement('script');
  //   the.src="duong dan den thu vien javascript";
  //   document.body.appendChild(the);
  // }
  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    this.isValidEmail = pattern.test(value)
    return this.isValidEmail
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      this.reset.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'Succes',
            summary: 'Reset Succes',
            duration: 500
          });
          console.log(this.resetPasswordEmail);
          this.resetPasswordEmail = ""
          this.router.navigate(['home'])
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Something went wrong!',
            duration: 500
          });
        },
      })
    }
  }
}
