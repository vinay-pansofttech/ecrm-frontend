import { Component  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  loginForm: FormGroup;
  invalid =false;

  constructor() {
    this.loginForm = new FormGroup({
      createpassword: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
  console.log(this.loginForm);
  }

}
