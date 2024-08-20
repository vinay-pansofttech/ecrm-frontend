import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsConfigKey } from 'src/app/core/Constants';
import { LoginService } from '../login/components/login/login.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  private attachmentDetailsUrl = `${AppSettingsConfigKey.APIURL}/api/UploadDownload/GetAttachmentDetails`;
  private downloadAttachmentUrl = `${AppSettingsConfigKey.APIURL}/api/UploadDownload/DownloadAttachment`;

  docSrcTypeSuppAttachment: number = 58;
  docSrcTypeAttachment: number = 22;
  docSrcTypeWSAttachment: number = 658;


  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private datePipe: DatePipe
  ) {}

  getAttachmentDetails(enqID: string, docSrcType: number, docSrcGUID: string) {
    const url = this.attachmentDetailsUrl;

    const body = {
      docSrcVal: enqID.toString(),
      docSrcType: docSrcType,
      docSrcGUID: docSrcGUID
    };
    return this.http.post(url, body);
  }

  getAttachment(enqID: string, docSrcType: number, attachmentGUID: string, index: number) {
    const url = this.downloadAttachmentUrl;

    const body = {
      docSrcVal: enqID.toString(),
      docSrcType: docSrcType,
      docSrcGUID: attachmentGUID,
      index: index
    };
    return this.http.post(url, body, {responseType: 'blob', observe: 'response'});
  }

}
