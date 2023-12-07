import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextBoxComponent } from "@progress/kendo-angular-inputs";
import { eyeIcon, SVGIcon } from "@progress/kendo-svg-icons";
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  invalid =false;
 
  @ViewChild("textbox")
  public textbox!: TextBoxComponent;

  public eyeIcon: SVGIcon = eyeIcon;

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  public ngAfterViewInit(): void {
    this.textbox.input.nativeElement.type = "password";
  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;

    if (inputEl.type === "password") {
      inputEl.type = "text";
    } else {
      inputEl.type = "password";
    }
  }
  

  onSubmit() {
   
  console.log(this.loginForm);
  this.loginService.loginUser({username: this.loginForm.value.username, password: 'MwYDHCg7Yoqei85vbZ0NjNAY7DZLBFX8hLv5U9Wp1sLAPixs+TbSdLxhUFUl66at'}).subscribe((data)=>{
    console.log("subscribe", data)
  })
  }
 

}
