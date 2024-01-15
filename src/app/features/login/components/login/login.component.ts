/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { eyeIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { LoginService } from './login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

function extractPrivilegeAndMenuName(data: any) {
  const privileges: string[] = [];
  const menuNames: string[] = [];

  data.forEach((item: any) => {
    privileges.push(item.privilege);
    menuNames.push(item.menuName);
  });

  return { privileges, menuNames };
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnInit {
  loginForm: FormGroup;
  invalid = false;

  @ViewChild('textbox')
  public textbox!: TextBoxComponent;

  public eyeIcon: SVGIcon = eyeIcon;
  public showLoader = false;
  constructor(
    private loginService: LoginService,
    private loaderService: LoaderService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    console.log('login');
  }
  public ngAfterViewInit(): void {
    this.textbox.input.nativeElement.type = 'password';
  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;

    if (inputEl.type === 'password') {
      inputEl.type = 'text';
    } else {
      inputEl.type = 'password';
    }
  }

  onHandleAfterSignin(apiResponse: any) {
    console.log('after login service', apiResponse);
    if (apiResponse[0]?.empId) {
      this.loginService.employeeId = apiResponse[0]?.empId;
      const result = extractPrivilegeAndMenuName(apiResponse);
      this.loginService.privileges = result.privileges;
      this.router.navigate(['dashboard']);
    } else {
      this.notificationService.showNotification(
        'Invalid username or password',
        'error'
      );
    }
  }
  onSubmit() {
    this.showLoader = true;

    this.loginService
      .loginUser({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      })
      .subscribe(
        data => {
          this.showLoader = false;
          console.log('subscribe', data);
          this.onHandleAfterSignin(data);
        },
        error => {
          this.showLoader = false;
        }
      );
  }

onEnterPressed() {
  this. onSubmit();
}

}
