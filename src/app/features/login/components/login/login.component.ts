import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { eyeIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { LoginService } from './login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  invalid = false;

  @ViewChild('textbox')
  public textbox!: TextBoxComponent;

  public eyeIcon: SVGIcon = eyeIcon;
  public showLoader: boolean = false;
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
    // this.loaderService.loaderState.subscribe(loaderState => {
    //   this.showLoader = loaderState;
    // });
    // console.log('spinner', this.showLoader);
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
    if (apiResponse[0]?.outPutValue === 'Success') {
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
}
