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

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private datePipe: DatePipe
  ) {}

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

  getEngEfforts(EmpId: number, SRID: number) {
    const url = `${AppSettingsConfigKey.APIURL}/api/ServiceCalendar/GetEngEfforts`;
    const body = {
      empId: EmpId,
      srid: SRID
    };
    return this.http.post(url, body);
  }

  putServiceEfforts(formData: any){
    const url = `${AppSettingsConfigKey.APIURL}/api/ServiceCalendar/AddEngEfforts`;
    const body = {
      srid: formData.srid,
      lstEfforts: [
        {
          empId: this.loginService.employeeId,
          srSchId: formData.sRSchId,
          subTaskId: formData.subTaskId,
          calendarId: formData.calendarId,
          onDate: formData.onDate,
          startTime: formData.startTime? formData.startTime : '',
          endTime: formData.endTime? formData.endTime : '',
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

  getCSRfile(SRID: number, CSRSummary: string, CallCategory: string, IsCallCompleted: boolean, CustomerSign: string){
    const url = `${AppSettingsConfigKey.APIURL}/api/ServiceCalendar/GenerateCSRPath`;
    const body = {
      "SRID": SRID,
      "LoginID": this.loginService.employeeId,
      "CSRSummary": CSRSummary,
      "CallCategory": CallCategory,
      "IsCallCompleted": IsCallCompleted,
      "CustomerSign": CustomerSign? CustomerSign: null
    };
    return this.http.post(url, body);
  }

  getCSRPdf(FilePath: string){
    const url = `${AppSettingsConfigKey.APIURL}/api/UploadDownload/GetCSRDownloadFile`;
    const body = {
      "FilePath": FilePath
    };
    return this.http.post(url, body, {responseType: 'arraybuffer', observe: 'response'});
  }

  resetValues(){
    this.selectedSRID = 0;
    this.selectedCallCat = "";
    this.selectedCallCompletion = false;
    this.csrComments = "";
  }

}
