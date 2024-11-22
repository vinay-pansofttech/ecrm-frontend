import { AfterViewInit, Component, ViewChild  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputType, TextBoxComponent } from '@progress/kendo-angular-inputs';
import { eyeIcon, arrowLeftIcon, checkOutlineIcon, SVGIcon } from "@progress/kendo-svg-icons";
// import { PopoverComponent } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements AfterViewInit{
  loginForm: FormGroup;
  invalid =false;
  isLengthValid = false;
  isCapitalValid = false;
  isNumberValid = false;
  isPasswordNotMatching = false;

  public eyeIcon: SVGIcon = eyeIcon;
  public arrowLeftIcon: SVGIcon = arrowLeftIcon;
  public checkOutlineIcon: SVGIcon = checkOutlineIcon;
  @ViewChild("newPassword") public newPassword!: TextBoxComponent;
  @ViewChild("confirmPassword") public confirmPassword!: TextBoxComponent;
  // @ViewChild('popover') popover!: PopoverComponent;

  constructor() {
    this.loginForm = new FormGroup({
      createpassword: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.nullValidator]),
    });
  }
  public ngAfterViewInit(): void {
    this.newPassword.input.nativeElement.type = "password";
    this.confirmPassword.input.nativeElement.type = "password";
  }

  public newPasswordInputType: InputType = 'password';
  public confirmPasswordInputType: InputType = 'password';

  onPasswordKeyup(target: EventTarget | null): void {
    if (target instanceof HTMLInputElement) {
      const value = target.value;
      this.checkPasswordStrength(value);
    }
  }

  onConfirmPasswordKeyup(target: EventTarget | null): void {
    if (target instanceof HTMLInputElement) {
      const value = target.value;
      if(this.loginForm.value.createpassword !== value){
        this.isPasswordNotMatching = true;
      }
      else{
        this.isPasswordNotMatching = false;
      }
    }
  }

  checkPasswordStrength(pswd: string) {
    this.isLengthValid = pswd.length >= 5;
    this.isCapitalValid = /[A-Z]/.test(pswd);
    this.isNumberValid = /\d/.test(pswd);
    if(this.loginForm.value.confirmPassword !== pswd){
      this.isPasswordNotMatching = true;
    }
    else{
      this.isPasswordNotMatching = false;
    }
  }

  public toggleVisibility(inputType:string): void {
    if (inputType === 'confirmPassword') {
      this.confirmPasswordInputType === 'text' ? this.confirmPasswordInputType = 'password' : this.confirmPasswordInputType = 'text';
    }
    if (inputType === 'newPassword') {
      this.newPasswordInputType === 'text' ? this.newPasswordInputType = 'password' : this.newPasswordInputType = 'text';
    }
  }
  
  onSubmit() {
    const formValue = this.loginForm.value;
    if (formValue.createpassword != formValue.confirmPassword) {
      this.isPasswordNotMatching=true;
    }
  }

}
