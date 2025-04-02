import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppRoutePaths } from 'src/app/core/Constants';
import { LoginService } from '../login/components/login/login.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationService } from 'src/app/core/services/notification.service';

export interface AttachmentFileInfo
{
  name: string,
  size: number | null,
  docSrcVal: string,
  docSrcType: number,
  docSrcGUID: string
}

export interface AttachmentPopupDetails
{
  docSrcVal: string,
  docSrcType: number,
  docSrcGUID: string,
  touchEvent: MouseEvent | TouchEvent | null
}

@Injectable({
  providedIn: 'root'
})

//Common service for API calls which should is accessible through all components
export class CommonService {
  private attachmentDetailsUrl = `${this.configService.apiUrl}/api/UploadDownload/GetAttachmentDetails`;
  private downloadAttachmentUrl = `${this.configService.apiUrl}/api/UploadDownload/DownloadAttachment`;
  private updateMenuUsageUrl = `${this.configService.apiUrl}/api/Common/UpdateMenuUsage`;

  docSrcTypeSuppAttachment: number = 58;
  docSrcTypeAttachment: number = 22;
  docSrcTypeWSAttachment: number = 658;
  docSrcTypeCSRAttachment: number = 11;
  docIBStickerAttachment: number = 708;
  
  public currentUrl: string | null = null;
  public navigationMap: Map<string, string> = new Map();

  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private notificationService: NotificationService,
    private loginService: LoginService,
    private configService: ConfigService,
  ) {}

  displayNumberFormat(value: number | null | undefined) {
    return value != null? this.decimalPipe.transform(value, '1.0-0', 'en-US') : '';
  }

  displayDecimalFormat(value: number | null | undefined) {
    return value != null? this.decimalPipe.transform(value, '1.2-2', 'en-US') : '';
  }

  displayDateFormat(value: Date | string | null) {
    return value ? this.datePipe.transform(value, 'dd-MMM-yyyy') : '';
  }

  convertDateStringToDate(dateString: string | null): Date | null {
    if(dateString){
    return new Date(dateString);
    }
    else{
      return null;
    }
  }

  //API Call to fetch the attachment details
  getAttachmentDetails(enqID: string, docSrcType: number, docSrcGUID: string) {
    const body = {
      docSrcVal: enqID.toString(),
      docSrcType: docSrcType,
      docSrcGUID: docSrcGUID
    };
    return this.http.post(this.attachmentDetailsUrl, body);
  }

  //API Call to download the attachment
  getAttachment(enqID: string, docSrcType: number, attachmentGUID: string, index: number) {
    const body = {
      docSrcVal: enqID.toString(),
      docSrcType: docSrcType,
      docSrcGUID: attachmentGUID,
      index: index
    };
    return this.http.post(this.downloadAttachmentUrl, body, {responseType: 'blob', observe: 'response'});
  }

  handleNavigationEvents(routerEvents: any, backNavigationCallback?: () => void): Subscription | undefined{
    if (!this.loginService.employeeId) {
      this.router.navigate([AppRoutePaths.Default]);
      return;
    }
    return routerEvents
      .pipe(
          filter(event => event instanceof NavigationStart)
      )
      .subscribe((event: NavigationStart) => {
          if (this.currentUrl) {
            const isBackwardNavigation = this.navigationMap.has(event.url) && 
                                         this.navigationMap.get(event.url) === this.currentUrl;
            if(!isBackwardNavigation){
              this.navigationMap.set(this.currentUrl, event.url);
            }
          }
          const isBackNavigation = this.navigationMap.has(event.url) && 
          this.navigationMap.get(event.url) === this.currentUrl &&  event.navigationTrigger === 'popstate';

          this.currentUrl = event.url;       
          
          if (isBackNavigation && backNavigationCallback) {
            backNavigationCallback();
          }
        });
  }

  handleLogout() {
    this.loginService.logoutUser().subscribe((data: any) => {
      if (data) {
        const notificationMessage = data.outPut;
        const notificationType = data.outPut.indexOf('success') !== -1 ? 'success' : 'error';
        this.notificationService.showNotification(
          notificationMessage,
          notificationType,
          'center',
          'bottom'
        );
      }
    },        
    error => {
      this.notificationService.showNotification(
        'Error logging out' + error,
        'error', 'center', 'bottom'
      );
    });
    this.loginService.employeeId = '';
    this.navigationMap.clear();
    this.router.navigate([AppRoutePaths.Login]);
  }

  getIPAddress(){  
    return this.http.get("http://api.ipify.org/?format=json");  
  }

  updateMenuUsage(MenuName: string){
    const body = {
      'empId': this.loginService.employeeId as number,
      'screenName': MenuName
    }
    return this.http.post(this.updateMenuUsageUrl, body);
  }

}

