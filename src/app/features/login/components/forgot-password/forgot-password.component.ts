import { AfterViewInit, Component, ViewChild  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextBoxComponent } from "@progress/kendo-angular-inputs";
import { eyeIcon, SVGIcon } from "@progress/kendo-svg-icons";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements AfterViewInit{
  loginForm: FormGroup;
  invalid =false;

  @ViewChild("newPassword")
  public newPassword!: TextBoxComponent;

  @ViewChild("confirmPassword")
  public confirmPassword!: TextBoxComponent;
  public eyeIcon: SVGIcon = eyeIcon;
  

  constructor() {
    this.loginForm = new FormGroup({
      createpassword: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
    });
  }
  public ngAfterViewInit(): void {
    this.newPassword.input.nativeElement.type = "password";
    this.confirmPassword.input.nativeElement.type = "password";
  }

  public toggleVisibility(inputType:string ): void {
    const inputEl = inputType === 'newPassword' ? this.newPassword.input.nativeElement : this.confirmPassword.input.nativeElement

    if (inputEl.type === "password") {
      inputEl.type = "text";
    } else {
      inputEl.type = "password";
    }
  }

  

  onSubmit() {
  }

}
