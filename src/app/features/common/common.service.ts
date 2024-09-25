import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/components/login/login.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';

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

  docSrcTypeSuppAttachment: number = 58;
  docSrcTypeAttachment: number = 22;
  docSrcTypeWSAttachment: number = 658;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private configService: ConfigService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe
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

}

