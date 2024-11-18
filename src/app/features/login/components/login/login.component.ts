/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputType, TextBoxComponent } from '@progress/kendo-angular-inputs';
import { eyeIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { AppRoutePaths } from 'src/app/core/Constants';
import { LoginService } from './login.service';
import { CommonService } from 'src/app/features/common/common.service';
import { LoaderService } from 'src/app/core/services/loader.service';
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
export class LoginComponent implements AfterViewInit, OnInit, OnDestroy {
  loginForm: FormGroup;
  invalid = false;
  @ViewChild('textbox')
  public textbox!: TextBoxComponent;
  public eyeIcon: SVGIcon = eyeIcon;
  public showLoader = false;
  private popstateSubscription?: Subscription;

  constructor(
    private loginService: LoginService,
    private loaderService: LoaderService,
    private commonService: CommonService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.popstateSubscription = this.commonService.handleNavigationEvents(this.router.events);
  }

  ngOnDestroy(): void {
    this.popstateSubscription?.unsubscribe();
  }

  public ngAfterViewInit(): void {
    this.textbox.input.nativeElement.type = 'password';
  }

  public inputType: InputType = 'password';
  public togglePasswordVisibility(): void {
    this.inputType === 'password'
      ? (this.inputType = 'text')
      : (this.inputType = 'password');
  }

  onHandleAfterSignin(apiResponse: any) {
    if (apiResponse[0]?.empId) {
      this.loginService.employeeId = apiResponse[0]?.empId;
      this.loginService.setEmployeeName(apiResponse[0]?.employeeName);
      const result = extractPrivilegeAndMenuName(apiResponse);
      this.loginService.privileges = result.privileges;
      this.loginService.tokenId = apiResponse[0]?.tokenID;
      this.commonService.navigationMap.set('/', '/dashboard');
      this.commonService.currentUrl = '/dashboard';
      this.router.navigate([AppRoutePaths.Dashboard]);
    } else {
      this.notificationService.showNotification(
        'Invalid username or password',
        'error', 'center', 'bottom'
      );
    }
  }
  async onSubmit() {
    this.showLoader = true;
    let userIPAddress: string = "192.168.10.83";
    try {
      const res: any = await firstValueFrom(this.commonService.getIPAddress());
      userIPAddress = res.ip;
    } catch (error) {
      userIPAddress = "192.168.10.83";
    }

    this.loginService
      .loginUser(
        this.loginForm.value.username,
        this.loginForm.value.password,
        userIPAddress
      )
      .subscribe(
        data => {
          this.showLoader = false;
          this.onHandleAfterSignin(data);
        },
        error => {
          this.showLoader = false;
          this.notificationService.showNotification(
            error.error.text,
            'error', 'center', 'bottom'
          );
        }
      );
  }

  onEnterPressed() {
    this.onSubmit();
  }
}
