import { Injectable, booleanAttribute } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsConfigKey } from 'src/app/core/Constants';
import { LoginService } from '../login/components/login/login.service';
import { DatePipe } from '@angular/common';

export interface CallsList {
  srid: number;
  ueu: string;
  siteName: string;
  contactName: string;
  phoneNumber: string;
  primaryAddress: string;
  email: string;
  gpsCoordinate: string;
  productName: string;
  manufacturer: string;
  serialNumber: string;
  callCategory: string;
  callType: string;
  callDescription: string;
  isCallCompleted: boolean;
}

export interface engEffortsDetails {
  empId: number;
  sRSchId: number;
  subTaskId: number;
  calendarId: number;
  onDate: string;
  startTime: string;
  endTime: string;
  effortHours: string;
  travelHours: string;
  isNoEffortSpent: boolean;
  remarks: string;
  subTaskScheduleDtlId: number;
  srid: number;
}

export interface engEffortsList {
  empId: number;
  srid: number;
  name: string;
  ondate: string;
  startTime?: string;
  endTime?: string;
  effortHours: string;
  travelHours: string;
  taskType: string;
  remarks: string;
}

@Injectable({
  providedIn: 'root'
})

export class ServiceCalendarService {
  selectedDate!: Date;
  selectedSRID! : number;
  selectedCallCat!: string;
  selectedCallCompletion!: boolean;
  csrComments!: string;
  CSRUploadSrcType: number = 11;
  private uploadURL= `${AppSettingsConfigKey.APIURL}/api/UploadDownload/UploadFile`;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private datePipe: DatePipe
  ) {}

  //API call to fetch calls scheduled for that day
  getScheduledCalls(EmpId: number, ScheduledDate: Date) {
    const url = `${AppSettingsConfigKey.APIURL}/api/ServiceCalendar/GetScheduledCalls`;
    const formattedDate = ScheduledDate
    ? this.datePipe.transform(ScheduledDate, 'yyyy-MM-dd')
    : null;
    const body = {
      empId: EmpId,
      scheduledDate: formattedDate
    };
    return this.http.post(url, body);
  }

  //API call to fetch engineer efforts
  getEngEfforts(EmpId: number, SRID: number) {
    const url = `${AppSettingsConfigKey.APIURL}/api/ServiceCalendar/GetEngEfforts`;
    const body = {
      empId: EmpId,
      srid: SRID
    };
    return this.http.post(url, body);
  }

  //API call to update service efforts entered by engineer
  putServiceEfforts(formData: any){
    const url = `${AppSettingsConfigKey.APIURL}/api/ServiceCalendar/AddEngEfforts`;
    const formattedStartDate = formData.startTime
      ? this.datePipe.transform(formData.startTime, "yyyy-MM-dd'T'HH:mm:ss")
      : null;

    const formattedEndDate = formData.endTime
      ? this.datePipe.transform(formData.endTime, "yyyy-MM-dd'T'HH:mm:ss")
      : null;

    const body = {
      srid: formData.srid,
      lstEfforts: [
        {
          empId: this.loginService.employeeId,
          srSchId: formData.sRSchId,
          subTaskId: formData.subTaskId,
          calendarId: formData.calendarId,
          onDate: formData.onDate,
          startTime: formData.startTime? formattedStartDate : '',
          endTime: formData.endTime? formattedEndDate : '',
          effortHours: formData.effortHours,
          travelHours: formData.travelHours,
          isNoEffortSpent: formData.isNoEffortSpent,
          remarks: formData.remarks? formData.remarks : '',
          subTaskScheduleDtlId: formData.subTaskScheduleDtlId
        }
      ],
      loginId: this.loginService.employeeId
    };
    return this.http.post(url, body);
  }

  //API call to generate new CSR file after signature
  getCSRfile(SRID: number, CSRSummary: string, CallCategory: string, IsCallCompleted: boolean, CustomerSign: string, EngineerSign: string){
    const url = `${AppSettingsConfigKey.APIURL}/api/ServiceCalendar/GenerateCSRPath`;
    const body = {
      "SRID": SRID,
      "LoginID": this.loginService.employeeId,
      "CSRSummary": CSRSummary,
      "CallCategory": CallCategory,
      "IsCallCompleted": IsCallCompleted,
      "CustomerSign": CustomerSign? CustomerSign: null,
      "EngineerSign": EngineerSign? EngineerSign: null
    };
    return this.http.post(url, body);
  }

  //API call to get generated CSR file
  getCSRPdf(FilePath: string){
    const url = `${AppSettingsConfigKey.APIURL}/api/UploadDownload/GetCSRDownloadFile`;
    const body = {
      "FilePath": FilePath
    };
    return this.http.post(url, body, {responseType: 'arraybuffer', observe: 'response'});
  }

  //API call to upload CSR file
  putUploadCSR(docSrcVal: string, attachment: any) {
    const url = `${AppSettingsConfigKey.APIURL}/api/ServiceCalendar/UploadCSR`;

    const body = new FormData();
    body.append('docSrcVal', docSrcVal);
    body.append('docSrcType', this.CSRUploadSrcType as any);
    body.append('LoginID', this.loginService.employeeId as string);
    body.append('attachment', attachment? attachment: null);
  
    return this.http.put(url, body);
  }
  
  //Function to reset all the common values stored in calendar service
  resetValues(){
    this.selectedSRID = 0;
    this.selectedCallCat = "";
    this.selectedCallCompletion = false;
    this.csrComments = "";
  }

}
