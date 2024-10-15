import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/components/login/login.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { DatePipe } from '@angular/common';

export interface callsList {
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
  isPrimary: boolean;
  isEffortEdit: boolean;
}

export interface svcPartsDetails {
  partNo?: string;
  option?: string;
  description?: string;
  productLine?: string;
  partsTypeID?: number | null;
  currency?: number | null;
  currencyName?: string;
  discount?: number | null;
  isActive?: boolean | null;
  partsMasterID?: number | null;
  price?: number | null;
  partsTypeName?: string;
  isServiceItem?: boolean | null;
  rateType?: number | null;
  isVendorQoteMandat?: boolean | null;
  isCurrencyEdit?: boolean | null;
  partReqId?: number | null;
  partsID?: number | null;
  partListID?: number | null;
  eono?: string;
  eoDate?: string;
  supplierID?: number | null;
  supplierName?: string;
  quantity?: number | null;
  retQuantity?: number | null;
  unitPrice?: number | null;
  status?: number | null;
  partStatus?: string;
  arrivedDate?: string;
  orderValue?: number | null;
  conversionRate?: number | null;
  pL_ArrivedDate?: string;
  remark?: string;
  procurementReasonId?: number | null;
  procurementReason?: string;
  configItemId?: number | null;
  itemSP?: number | null;
  unitItemSP?: number | null;
  isQuoteEnable?: boolean | null;
  isPartItemEdit?: boolean | null;
  isChecked?: boolean | null;
  isCardSelected?: boolean | null;
  isDescOpen?: boolean | null;
}

export interface svcDependentComboData {
  comboId?: number;
  comboName?: string;
  comboType?: string;
  refId?: number;
  specialType?: string;
}

export interface svcPrerequisites {
  customerId: number;
  partReqId?: number;
  callIOID?: number;
  isInProgress: boolean | null;
  serviceComments: string | null;
  isPartsRequestShow: boolean | null;
  isGenerateCSR: boolean | null;
}

export interface svcPartsRequest {
  partReqId: number;
  partsMasterId: number;
  partListId: number;
  supplierId: number;
  partsId: number;
  partNo: string;
  option: string | null;
  description: string;
  productLine: string;
  quantity: number;
  retQuantity: number;
  status: number;
  currency: number;
  unitPrice: number;
  discount: number;
  partsTypeId: number;
  conversionRate: number;
  arrivedDate: string | null;
  createdBy: number;
  createdDate?: Date | null;
  modifiedBy: number;
  modifiedDate?: Date | null;
  remark: string | null;
  procurementReasonId: number;
  procurementReason: string;
  spCurrencyId: number;
  itemSp: number;
  configItemId: number;
  partsContractId: number;
  isChecked: boolean;
  supplierName: string;
  orderValue: number;
  unitItemSp: number;
  isActive: boolean;
  isVendorQoteMandat: boolean;
  isCurrencyEdit: boolean;
  plArrivedDate: string | null;
  suppDiscount: number;
  installBaseId?: number | null;
  ibSerialNumber: string | null;
  entitlementPartNo: string | null;
  entitlementSupplier: string | null;
  entitlementSupplierId: number;
  entitlementOption: string | null;
  entitlementPartId?: number | null;
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
  addedPartsDetailsCard: svcPartsDetails[] = [];

  private getServicePrerequisitesUrl = `${this.configService.apiUrl}/api/ServiceCalendar/GetSVCPrerequisites`;
  private getDependentComboUrl = `${this.configService.apiUrl}/api/ServiceCalendar/GetDependentCombo`;
  private getScheduledCallsUrl = `${this.configService.apiUrl}/api/ServiceCalendar/GetScheduledCalls`;
  private getEngEffortsUrl = `${this.configService.apiUrl}/api/ServiceCalendar/GetEngEfforts`;
  private postEngEffortsUrl = `${this.configService.apiUrl}/api/ServiceCalendar/AddEngEfforts`;
  private postGenerateCSRUrl = `${this.configService.apiUrl}/api/ServiceCalendar/GenerateCSRPath`;
  private getCSRDownloadFileUrl = `${this.configService.apiUrl}/api/UploadDownload/GetCSRDownloadFile`;
  private postUploadCSRUrl = `${this.configService.apiUrl}/api/ServiceCalendar/UploadCSR`;
  private getPartsSearchUrl = `${this.configService.apiUrl}/api/ServiceCalendar/GetPartsDetails`;
  private postPartsRequestUrl = `${this.configService.apiUrl}/api/ServiceCalendar/PartsRequest`;


  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private configService: ConfigService,
    private datePipe: DatePipe
  ) {}

  //API call to get dependent combo data
  getDependentCombo(FieldName: string, Id: number, EmpId: number){
    const body = {
      fieldName: FieldName,
      id: Id,
      empId: EmpId
    };
    return this.http.post(this.getDependentComboUrl, body);
  }

  getServicePrerequisites(SRID: number, EmpId: number){
    const body = {
      srid: SRID,
      empId: EmpId,
    };
    return this.http.post(this.getServicePrerequisitesUrl, body);
  }

  //API call to fetch calls scheduled for that day
  getScheduledCalls(EmpId: number, ScheduledDate: Date) {
    const formattedDate = ScheduledDate
    ? this.datePipe.transform(ScheduledDate, 'yyyy-MM-dd')
    : null;
    const body = {
      empId: EmpId,
      scheduledDate: formattedDate
    };
    return this.http.post(this.getScheduledCallsUrl, body);
  }

  //API call to fetch engineer efforts
  getEngEfforts(EmpId: number, SRID: number) {
    const body = {
      empId: EmpId,
      srid: SRID
    };
    return this.http.post(this.getEngEffortsUrl, body);
  }

  //API call to update service efforts entered by engineer
  putServiceEfforts(formData: any){
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
    return this.http.post(this.postEngEffortsUrl, body);
  }

  //API call to generate new CSR file after signature
  getCSRfile(SRID: number, CSRSummary: string, CallCategory: string, IsCallCompleted: boolean, CustomerSign: string, EngineerSign: string){
    const body = {
      "SRID": SRID,
      "LoginID": this.loginService.employeeId,
      "CSRSummary": CSRSummary,
      "CallCategory": CallCategory,
      "IsCallCompleted": IsCallCompleted,
      "CustomerSign": CustomerSign? CustomerSign: null,
      "EngineerSign": EngineerSign? EngineerSign: null
    };
    return this.http.post(this.postGenerateCSRUrl, body);
  }

  //API call to get generated CSR file
  getCSRPdf(FilePath: string){
    const body = {
      "FilePath": FilePath
    };
    return this.http.post(this.getCSRDownloadFileUrl, body, {responseType: 'arraybuffer', observe: 'response'});
  }

  //API call to upload CSR file
  putUploadCSR(docSrcVal: string, attachment: any) {

    const body = new FormData();
    body.append('docSrcVal', docSrcVal);
    body.append('docSrcType', this.CSRUploadSrcType as any);
    body.append('LoginID', this.loginService.employeeId as string);
    body.append('attachment', attachment? attachment: null);
  
    return this.http.put(this.postUploadCSRUrl, body);
  }
  
  //API call to get searched parts details
  getSearchPartsDetails(ManufacturerId: number, SupplierId: number, PartNo: string, Description: string, ProductLine: string, PartsReqId: number, SRID: number){
    const body = {
      manufactureId: ManufacturerId,
      supplierId: SupplierId? SupplierId: 0,
      partNo: PartNo,
      description: Description,
      productLine: ProductLine,
      partReqId: PartsReqId,
      SRID: SRID
    };
    return this.http.post(this.getPartsSearchUrl, body);
  }

  //API call to request for added parts
  postPartsRequest(SRID: number, PartReqId: number, CustomerId: number, IOID: number, 
    VendorQuoteDocument: string, VendorQuoteSouceTypeID: number,
    lstPartReq: svcPartsRequest[], Source: string, IsInProgress: boolean)
  {
    const body = {
      srid: SRID,
      partReqId: PartReqId,
      customerId: CustomerId,
      ioid: IOID,
      CreatedBy: this.loginService.employeeId,
      ModifiedBy: this.loginService.employeeId,
      vendorQuoteDocument:VendorQuoteDocument,
      vendorQuoteSouceTypeID: VendorQuoteSouceTypeID,
      lstPartReq: lstPartReq,
      source: Source,
      isInProgress: IsInProgress
    };
    return this.http.post(this.postPartsRequestUrl, body);
  }
    
  //Function to reset all the common values stored in calendar service
  resetValues(){
    this.selectedSRID = 0;
    this.selectedCallCat = "";
    this.selectedCallCompletion = false;
    this.csrComments = "";
    this.addedPartsDetailsCard = [];
  }

}
