import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextBoxComponent } from "@progress/kendo-angular-inputs";
import { eyeIcon, SVGIcon } from "@progress/kendo-svg-icons";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  invalid =false;
 

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
   
  console.log(this.loginForm);
   
  }
  
  @ViewChild("textbox")
  public textbox!: TextBoxComponent;

  public eyeIcon: SVGIcon = eyeIcon;


  AfterViewInit(): void {
    this.textbox.input.nativeElement.type = "password";
  }



}
