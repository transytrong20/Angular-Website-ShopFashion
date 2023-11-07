import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  forgotForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', Validators.required]
    })
  }

  onSumbit() {
    if (this.forgotForm.valid) {
      console.log(this.forgotForm.value)
      this.auth.login(this.forgotForm.value).subscribe({
        next:(res)=>{
          alert(res.message);
          this.forgotForm.reset();
          this.router.navigate(['']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else {
      console.log("Form is not valid")
      this.validateAllFormFileds(this.forgotForm)
      alert("Your form is invalid")
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
}
