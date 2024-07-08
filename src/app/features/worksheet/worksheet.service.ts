import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettingsConfigKey } from 'src/app/core/Constants';
import { LoginService } from '../login/components/login/login.service';
import { DatePipe } from '@angular/common';

export interface WorkSheetSO {
  workSheetId: number;
  enqId: number;
  poExpectedDate: string;
  leadNo: string;
  leadStatus: string;
  isDeliveryMileType: number;
  customerName: string;
  quoteCompanyId?: number;
  paymentNoOfDays?: number;
  grossSPQC: number;
  grossSPBC?: number;
  advancedTraining?: number;
  otherCommitments?: number;
  gstExemptionValue?: number;
  gstExemptionPC?: number;
  sgst?: number;
  igst?: number;
  cgst?: number;
  sacCode: string;
  gstNo: string;
  trn?: string;
  vatPC?: number;
  vat?: number;
  netSPQC?: number;
  netSPBC?: number;
  taxPC?: number;
  taxTypeId?: number;
  taxValueQC?: number;
  taxValueBC?: number;
  quoteValueQC?: number;
  quoteValueBC: number;
  specialDiscountPC?: number;
  discountValue?: number;
  discountValueBC: number;
  isAccessWSApproval?: boolean;
  isPSGCheckPending?: number;
  totalTransOverheadQC?: number;
  totalTransOverheadBC?: number;
  soUnitRateWOPLCQC?: number;
  soTotRateWOPLCQC?: number;
  soUnitRateWOPLCBC?: number;
  soTotRateWOPLCBC?: number;
  totalSPQC?: number;
  totalSPBC?: number;
  plcQC?: number;
  plcBC?: number;
  sowspDifferenceQC: number;
  sowspDifferenceBC?: number;
  isDutyChangeAllowed?: boolean;
  isDutyFree?: boolean;
  sellingPriceMaintained?: boolean;
  isLeadLevelDiscount?: boolean;
  isProductLevelDiscount?: boolean;
  isItemLevelDiscount?: boolean;
  isFlatAmount?: boolean;
  isGSTExempted?: boolean;
  gstExemptedPC?: number;
  gstExemptedValue?: number;
  currentApproverComments?: string;
  currentApprovalLevel: string;
  nextApprovalLevel: number;
  level1Comments: string;
  level2Comments: string;
  level3Comments: string;
  level4Comments: string;
  otherCommitmentRemarks?: string;
  isDiscountCapExempted?: boolean;
  isContractRateChanged?: boolean;
  firstLevelApprover: string;
  secondLevelApprover: string;
  thirdLevelApprover: string;
  fourthLevelApprover: string;
  pendingApprovalMsg: string;
  isWSEditAllowed?: boolean;
  wsCreatedDate?: Date;
  wsCreatedBy: string;
  wsPreparedDate?: Date;
  wsPreparedBy: string;
  ssdContractTypeId?: number;
  isPriceEdited?: boolean;
  drqStatus: string;
  isOmanVATApplicable?: boolean;
  isOrderMapped: string;
  discFileExists?: number;
  additnSuppDiscQC?: number;
  additnSuppDiscBC?: number;
  loginLevel: string;
  totOutStanding: number;
  marginPC: number;
  marginQC: number;
  reasonForWSApproval: string;
  approvalLevelBGColor?: string;
  approvalLevelLBColor?: string;
  reCalcSysDisc: string;
  drqqC_PC?: number;
  drqbC_PC?: number;
}

export interface WorksheetPrerequisites{
  quoteCompanyName: string;
  baseCurrency: string;
  baseCurrencyId: number;
  quoteCurrencyName: string;
  quoteCurrencyId: number;
  conversionRate: number;
  marginExcelDownloadPrivilege?: number;
}

export interface WorksheetPaymentTerms {
  salePaymentId: number;
  payMileStoneId: number;
  paymentMilestone?: string;
  creditPercentage: number;
  percentage: number;
  creditDays: number;
  processDays: number;
  remarks?: string;
  isSelected: boolean;
  isDeleted: boolean;
  rankNo: number;
  color?: string;
}

export interface EnquiryDetails {
  dealNo: string;
  enqID: number;
  soldToLEID: number;
  soldToLE: string;
  salesChannel: string;
  enqStatusId: number;
  enqStatus: string;
  salesExecutiveID: number;
  salesExecutive: string;
  soldToContact: string;
  wsApprovalPendingWith: string;
  soldToContPhoneNo: string;
  soldToContactEmail: string;
  discPct: number;
  drqStatus: string;
  approxQuotevalue: number;
}

export interface EnquiryProductsSO {
  salesProductId?: number;
  enqId?: number;
  prodSeqNo?: number;
  supplierId?: number;
  supplierName: string;
  productId?: number;
  productName: string;
  prodStatusId?: number;
  prodStatusName: string;
  leadPositionId?: number;
  leadPosition: string;
  productPositionId?: number;
  productPositionName: string;
  quantity?: number;
  warrantyPC?: number;
  addlWarrantyPC?: number;
  warrentyYear?: number;
  addWarrentyYear?: number;
  trainingCost?: number;
  specialDiscountAmt?: number;
  _ProdPurchaseCost?: number;
  _ProdWarranty?: number;
  _AdjProdAddlWarranty?: number;
  _ProdTrgCost?: number;
  _ProdAdvTrgCost?: number;
  _ProdCommitments?: number;
  _ProdSellingPrice?: number;
  _AdjProdSellingPrice?: number;
  prodSplDiscount?: number;
  _ProdAddlWarranty?: number;
  prodSp?: number;
  quoteCurrencyName: string;
  quotevalue?: number;
  createdBy?: number;
  createdByName: string;
  createdDate: Date | string; // Date represented as string for simplicity
  modifiedBy?: number;
  modifiedByName: string;
  modifiedDate: Date | string; // Date represented as string for simplicity
  totalTransOverheadQC?: number;
  totalDerivedDiscQC?: number;
  totalSPQC?: number;
  quoteSellingPriceQC?: number;
  quoteSellingPriceBC?: number;
  isMaintainSellingPrice?: boolean;
  soRateWOPLC?: number;
  soUnitRateWOPLCQC?: number;
  soTotRateWOPLCQC?: number;
  soUnitRateWOPLCBC?: number;
  soTotRateWOPLCBC?: number;
  s_USOP?: number;
  s_TSOP?: number;
  ttc?: number;
  tsd?: number;
  q_USOP?: number;
  q_TSOP?: number;
  tqd?: number;
  tqdpc?: number;
  nsop?: number;
  averageDiscountCapPCAllowed?: number;
  maximumDiscountAllowed?: number;
  isRefInstalmandate?: boolean;
}

export interface ConfigItems {
  configItemId?: number;
  salesProductId?: number;
  productId?: number;
  productName?: string;
  prodSeqNo?: number;
  supplierID?: number;
  supplierName?: string;
  productline?: string;
  partNo?: string;
  option?: string;
  description?: string;
  quoteQty?: number;
  itemPurchaseCost?: number;
  itemSP?: number;
  unitSORateQC?: number;
  totalSORateQC?: number;
  totalTransOverheadQC?: number;
  totalSPQC?: number;
  quoteSellingPriceQC?: number;
  quoteSellingPriceBC?: number;
  totalSONetSPQC?: number;
  splDiscountAmtQC?: number;
  totalDerivedDiscPC?: number;
  totalDerivedDiscQC?: number;
  isMaintainSellingPrice?: boolean;
  rateTypeId?: number;
  isOptional?: boolean;
  serialNumber?: string;
  reqdQty?: number;
  contractMarginPC?: number;
  contractOverheads?: number;
  contractRate?: number;
  isDeliveryMilestone?: boolean;
  priced?: number;
  s_USOP?: number;
  s_TSOP?: number;
  ttc?: number;
  tsd?: number;
  q_USOP?: number;
  q_TSOP?: number;
  tqd?: number;
  tqdpc?: number;
  nsop?: number;
  isStandingOrder?: boolean;
  maxDiscToBeAllowed?: number;
  maxDiscPCAllowed?: number;
  isAlternateProduct?: number;
  isPriceEdited?: boolean;
  hCBPart?: string;
  isHighQuoteSelloutok?: boolean;
  isDLCApplied?: boolean;
}

export interface EnquiryList {
  id: string | number;
  dealNo: string;
  enqID: number;
  soldToLEID: number;
  soldToLE: string;
  salesChannel: string;
  enqStatusId: number;
  enqStatus: string;
  salesExecutiveID: number;
  salesExecutive: string;
  soldToContact: string;
  wsApprovalPendingWith: string;
  soldToContPhoneNo: number;
  approxQuotevalue: number;
  drqStatus: string;
  quoteCurrencyName: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorksheetService {
  private fetchWorksheetWorklistUrl = `${AppSettingsConfigKey.APIURL}/api/Enquiry/FetchWorksheetWorklist`;
  private fetchWorksheetDetailsUrl = `${AppSettingsConfigKey.APIURL}/api/Worksheet/GetWorksheetDetails`;
  private fetchWorksheetPrerequisiteUrl = `${AppSettingsConfigKey.APIURL}/api/Worksheet/GetWorksheetPrerequisites`;
  private fetchPaymentTermsUrl = `${AppSettingsConfigKey.APIURL}/api/Worksheet/GetPaymentTermsByCustomer`;
  private fetchtEnquiryProductsUrl = `${AppSettingsConfigKey.APIURL}/api/Worksheet/GetProductOverviewGridDtls`;
  private fetchtConfigItemsUrl = `${AppSettingsConfigKey.APIURL}/api/Worksheet/GetConfigItemsGridDtls`;
  private postAssignListParamsUrl = `${AppSettingsConfigKey.APIURL}/api/Worksheet/AssignWorksheetParam`;
  private getQuoteCompareFileUrl = `${AppSettingsConfigKey.APIURL}/api/UploadDownload/GetConfigPriceCompareDtls`;
  private postSaveWorksheetUrl = `${AppSettingsConfigKey.APIURL}/api/Worksheet/SaveWorksheet`;

  public worksheetDetailsCard: any[] = [];
  public paymentTerms: WorksheetPaymentTerms[] = [];
  public productItems: EnquiryProductsSO[] = [];
  public configItems: ConfigItems[] = [];
  public WorksheetPrerequisites: any[] = [];
  public wsattachments: any = [];

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private datePipe: DatePipe
  ) {}

  getEnquiryWorksheetlist() {
    const body = {
      loginID: this.loginService.employeeId,
    };
    return this.http.post(this.fetchWorksheetWorklistUrl, body);
  }

  getWorksheetDetails(enqId: number) {
    const body = {
      EnqId: enqId,
      EmpId: this.loginService.employeeId
    };
    return this.http.post(this.fetchWorksheetDetailsUrl, body);
  }

  getWorksheetPrerequisites(enqId: number) {
    const body = {
      EnqId: enqId,
      EmpId: this.loginService.employeeId as number
    };
    return this.http.post(this.fetchWorksheetPrerequisiteUrl, body);
  }

  getPaymentTerms(enqId: number, worksheetId: number) {
    const body = {
      EnqId: enqId,
      WorkSheetId: worksheetId
    };
    return this.http.post(this.fetchPaymentTermsUrl, body);
  }

  getProductItems(enqId: number, loginId: number) {
    const body = {
      EnqID: enqId,
      LoginId: loginId
    };
    return this.http.post(this.fetchtEnquiryProductsUrl, body);
  }

  getConfigItems(enqId: number) {
    const body = {
      EnqID: enqId
    };
    return this.http.post(this.fetchtConfigItemsUrl, body);
  }

  getQuoteCompareFile(enqId: number, loginId: number) {
    const url = this.getQuoteCompareFileUrl;
    const body = {
      EnqId: enqId,
      LoginId: loginId
    };
    return this.http.post(url, body, {responseType: 'blob', observe: 'response'});
  }

  postSaveEnquiry(formData: any,enqID: number) {
    // const attachmentfile =
    // formData.enquiryDescription.attachment && formData.enquiryDescription.attachment.length > 0
    //       ? formData.enquiryDescription.attachment[0]
    //       : null;
    // if (attachmentfile) {
    //   formData.enquiryDescription.attachment = attachmentfile;
    // } else {
    //   formData.enquiryDescription.attachment = '';
    // }  
    
    // const body = {
    //   enqId: enqID,
    //   worksheetId: this.worksheetDetailsCard[0].workSheetId,
    //   advancedTraining: this.worksheetDetailsCard[0].advancedTraining,
    //   otherCommitments: this.worksheetDetailsCard[0].otherCommitments,
    //   specialDiscountPC: this.worksheetDetailsCard[0].specialDiscountPC,
    //   paymentNoOfDays: this.worksheetDetailsCard[0].paymentNoOfDays,
    //   taxComponent: "",
    //   wsTaxSouceTypeId: 35,
    //   milestoneGuid: "",
    //   milestoneSouceTypeId: 65,
    //   lstConfigItems: this.configItems,
    //   _GrossSP: this.worksheetDetailsCard[0].grossSPQC,
    //   _GrossSPBC: this.worksheetDetailsCard[0].grossSPBC,
    //   _NetSP: this.worksheetDetailsCard[0].netSPQC,
    //   _NetSPBC: this.worksheetDetailsCard[0].netSPBC,
    //   _SplDiscActual: this.worksheetDetailsCard[0].specialDiscountPC,
    //   taxPC: this.worksheetDetailsCard[0].taxPC,
    //   taxTypeId: this.worksheetDetailsCard[0].taxTypeId,
    //   lstLeadProducts: this.productItems,
    //   gstExemptionPC: this.worksheetDetailsCard[0].gstExemptionPC,
    //   gstExemptionValue: this.worksheetDetailsCard[0].gstExemptedValue,
    //   lstPaymentTerms: this.paymentTerms,
    //   _AdjWsQuoteValueBC: this.worksheetDetailsCard[0].quoteValueBC,
    //   _AdjWsQuoteValue: this.worksheetDetailsCard[0].quoteValueQC,
    //   saveType: "Save",
    //   createdBy: this.loginService.employeeId,
    //   operationMode: "Save",
    //   appRejComments: "",
    //   isPriced: true,
    //   tax: 0,
    //   _VAT: this.worksheetDetailsCard[0].vat,
    //   _SGST: this.worksheetDetailsCard[0].sgst,
    //   _CGST: this.worksheetDetailsCard[0].cgst,
    //   _IGST: this.worksheetDetailsCard[0].igst,
    //   isDutyFree: this.worksheetDetailsCard[0].isDutyFree,
    //   isLeadLevelDiscount: this.worksheetDetailsCard[0].isLeadLevelDiscount,
    //   isProdLevelDiscount: this.worksheetDetailsCard[0].isProductLevelDiscount,
    //   isItemLevelDiscount: this.worksheetDetailsCard[0].isItemLevelDiscount,
    //   isFlatAmount: this.worksheetDetailsCard[0].isFlatAmount,
    //   otherCommitmentRemarks: this.worksheetDetailsCard[0].otherCommitmentRemarks == null? "": this.worksheetDetailsCard[0].otherCommitmentRemarks,
    //   level1Comments: formData.priceDetails.amComments,
    //   level2Comments: formData.priceDetails.smComments,
    //   level3Comments: formData.priceDetails.finComments,
    //   level4Comments: formData.priceDetails.mgmtComments,
    //   isDiscExempted: this.worksheetDetailsCard[0].isDiscountCapExempted,
    //   isPriceEdited: this.worksheetDetailsCard[0].isPriceEdited,
    //   wsDocumentGUID: "",
    //   wsDocumentSouceTypeId: 658,
    //   outPut: ""
    // };  

    const body = this.assignWorksheetParam(formData, enqID, "Save");
    // const headers = new HttpHeaders({
    //   'Accept': 'application/json'
    // });
    return this.http.put(this.postSaveWorksheetUrl, body);
  }

  assignWorksheetParam(formData: any, enqID: any, operationMode: string){
    const wsattachmentfile =
    formData.priceDetails.wsattachment && formData.priceDetails.wsattachment.length > 0
          ? formData.priceDetails.wsattachment[0]
          : null;
    if (wsattachmentfile) {
      formData.priceDetails.wsattachment = wsattachmentfile;
    } else {
      formData.priceDetails.wsattachment = '';
    }  
        
    // const body1 = {
    //   enqId: enqID,
    //   worksheetId: this.worksheetDetailsCard[0].workSheetId,
    //   advancedTraining: this.worksheetDetailsCard[0].advancedTraining,
    //   otherCommitments: this.worksheetDetailsCard[0].otherCommitments,
    //   specialDiscountPC: this.worksheetDetailsCard[0].specialDiscountPC,
    //   paymentNoOfDays: this.worksheetDetailsCard[0].paymentNoOfDays,
    //   taxComponent: "",
    //   wsTaxSouceTypeId: 35,
    //   milestoneGuid: "",
    //   milestoneSouceTypeId: 65,
    //   lstConfigItems: this.configItems,
    //   _GrossSP: this.worksheetDetailsCard[0].grossSPQC,
    //   _GrossSPBC: this.worksheetDetailsCard[0].grossSPBC,
    //   _NetSP: this.worksheetDetailsCard[0].netSPQC,
    //   _NetSPBC: this.worksheetDetailsCard[0].netSPBC,
    //   _SplDiscActual: this.worksheetDetailsCard[0].specialDiscountPC,
    //   taxPC: this.worksheetDetailsCard[0].taxPC,
    //   taxTypeId: this.worksheetDetailsCard[0].taxTypeId,
    //   lstLeadProducts: this.productItems,
    //   gstExemptionPC: this.worksheetDetailsCard[0].gstExemptionPC,
    //   gstExemptionValue: this.worksheetDetailsCard[0].gstExemptedValue,
    //   lstPaymentTerms: this.paymentTerms,
    //   _AdjWsQuoteValueBC: this.worksheetDetailsCard[0].quoteValueBC,
    //   _AdjWsQuoteValue: this.worksheetDetailsCard[0].quoteValueQC,
    //   saveType: operationMode,
    //   createdBy: this.loginService.employeeId,
    //   operationMode: operationMode,
    //   appRejComments: "",
    //   isPriced: true,
    //   tax: 0,
    //   _VAT: this.worksheetDetailsCard[0].vat,
    //   _SGST: this.worksheetDetailsCard[0].sgst,
    //   _CGST: this.worksheetDetailsCard[0].cgst,
    //   _IGST: this.worksheetDetailsCard[0].igst,
    //   isDutyFree: this.worksheetDetailsCard[0].isDutyFree,
    //   isLeadLevelDiscount: this.worksheetDetailsCard[0].isLeadLevelDiscount,
    //   isProdLevelDiscount: this.worksheetDetailsCard[0].isProductLevelDiscount,
    //   isItemLevelDiscount: this.worksheetDetailsCard[0].isItemLevelDiscount,
    //   isFlatAmount: this.worksheetDetailsCard[0].isFlatAmount,
    //   otherCommitmentRemarks: this.worksheetDetailsCard[0].otherCommitmentRemarks == null? "": this.worksheetDetailsCard[0].otherCommitmentRemarks,
    //   level1Comments: formData.priceDetails.amComments,
    //   level2Comments: formData.priceDetails.smComments,
    //   level3Comments: formData.priceDetails.finComments,
    //   level4Comments: formData.priceDetails.mgmtComments,
    //   wsattachment: formData.priceDetails.wsattachment,
    //   isDiscExempted: this.worksheetDetailsCard[0].isDiscountCapExempted,
    //   isPriceEdited: this.worksheetDetailsCard[0].isPriceEdited,
    //   wsDocumentGUID: "",
    //   wsDocumentSouceTypeId: 658,
    //   loginId: this.loginService.employeeId,
    //   outPut: ""
    // }; 

    const body = new FormData();
    body.append("enqId", enqID as string);
    body.append("worksheetId", this.worksheetDetailsCard[0].workSheetId as string as string);
    body.append("advancedTraining", this.worksheetDetailsCard[0].advancedTraining as string);
    body.append("otherCommitments", this.worksheetDetailsCard[0].otherCommitments as string);
    body.append("specialDiscountPC", this.worksheetDetailsCard[0].specialDiscountPC as string);
    body.append("paymentNoOfDays", this.worksheetDetailsCard[0].paymentNoOfDays as string);
    body.append("taxComponent", "''");
    body.append("wsTaxSouceTypeId", "35");
    body.append("milestoneGuid", "" as string);
    body.append("milestoneSouceTypeId", "65");
    body.append("lstConfigItems", this.configItems as unknown as string);
    body.append("_GrossSP", this.worksheetDetailsCard[0].grossSPQC as string);
    body.append("_GrossSPBC", this.worksheetDetailsCard[0].grossSPBC as string);
    body.append("_NetSP", this.worksheetDetailsCard[0].netSPQC as string);
    body.append("_NetSPBC", this.worksheetDetailsCard[0].netSPBC as string);
    body.append("_SplDiscActual", this.worksheetDetailsCard[0].specialDiscountPC as string);
    body.append("taxPC", this.worksheetDetailsCard[0].taxPC as string);
    body.append("taxTypeId", this.worksheetDetailsCard[0].taxTypeId as string);
    body.append("lstLeadProducts", this.productItems as unknown as string);
    body.append("gstExemptionPC", this.worksheetDetailsCard[0].gstExemptionPC as string);
    body.append("gstExemptionValue", this.worksheetDetailsCard[0].gstExemptedValue as string);
    body.append("lstPaymentTerms", this.paymentTerms as unknown as string);
    body.append("_AdjWsQuoteValueBC", this.worksheetDetailsCard[0].quoteValueBC as string);
    body.append("_AdjWsQuoteValue", this.worksheetDetailsCard[0].quoteValueQC as string);
    body.append("saveType", operationMode);
    body.append("createdBy", this.loginService.employeeId as string);
    body.append("operationMode", operationMode);
    body.append("appRejComments", "''");
    body.append("isPriced", "true");
    body.append("tax", "0");
    body.append("_VAT", this.worksheetDetailsCard[0].vat as string);
    body.append("_SGST", this.worksheetDetailsCard[0].sgst as string);
    body.append("_CGST", this.worksheetDetailsCard[0].cgst as string);
    body.append("_IGST", this.worksheetDetailsCard[0].igst as string);
    body.append("isDutyFree", this.worksheetDetailsCard[0].isDutyFree as string);
    body.append("isLeadLevelDiscount", this.worksheetDetailsCard[0].isLeadLevelDiscount as string);
    body.append("isProdLevelDiscount", this.worksheetDetailsCard[0].isProductLevelDiscount as string);
    body.append("isItemLevelDiscount", this.worksheetDetailsCard[0].isItemLevelDiscount as string);
    body.append("isFlatAmount", this.worksheetDetailsCard[0].isFlatAmount as string);
    body.append("otherCommitmentRemarks", this.worksheetDetailsCard[0].otherCommitmentRemarks == null ? "" : this.worksheetDetailsCard[0].otherCommitmentRemarks);
    body.append("level1Comments", formData.priceDetails.amComments == ""? "''": formData.priceDetails.amComments);
    body.append("level2Comments", formData.priceDetails.smComments == ""? "''": formData.priceDetails.smComments);
    body.append("level3Comments", formData.priceDetails.finComments == ""? "''": formData.priceDetails.finComments);
    body.append("level4Comments", formData.priceDetails.mgmtComments == ""? "''": formData.priceDetails.mgmtComments);
    body.append("wsattachment", formData.priceDetails.wsattachment);
    body.append("isDiscExempted", this.worksheetDetailsCard[0].isDiscountCapExempted as string);
    body.append("isPriceEdited", this.worksheetDetailsCard[0].isPriceEdited as string);
    body.append("wsDocumentGUID", "4ac78588-6406-4aaa-8024-cfd0dc710915");
    body.append("wsDocumentSouceTypeId", "658");
    body.append("loginId", this.loginService.employeeId as string);
    body.append("outPut", "''");

    console.log('productItems',this.productItems);
    console.log('configItems',this.configItems);
    console.log('paymentTerms',this.paymentTerms);

    return body;
  }

  // postAssignListParams() {
  //   const body = {
  //      lstPaymentTerms: this.paymentTerms,
  //      lstConfigItems: this.configItems,
  //      lstLeadProducts: this.productItems,
  //   };
  //   return this.http.post(this.postAssignListParamsUrl, body);
  // }

  postApproveEnquiry(formData: any,enqID: number) {
    // const attachmentfile =
    // formData.enquiryDescription.attachment && formData.enquiryDescription.attachment.length > 0
    //       ? formData.enquiryDescription.attachment[0]
    //       : null;
    // if (attachmentfile) {
    //   formData.enquiryDescription.attachment = attachmentfile;
    // } else {
    //   formData.enquiryDescription.attachment = '';
    // }  
    
    // const body = {
    //   enqId: enqID,
    //   worksheetId: this.worksheetDetailsCard[0].workSheetId,
    //   advancedTraining: this.worksheetDetailsCard[0].advancedTraining,
    //   otherCommitments: this.worksheetDetailsCard[0].otherCommitments,
    //   specialDiscountPC: this.worksheetDetailsCard[0].specialDiscountPC,
    //   paymentNoOfDays: this.worksheetDetailsCard[0].paymentNoOfDays,
    //   taxComponent: "",
    //   wsTaxSouceTypeId: 35,
    //   milestoneGuid: "",
    //   milestoneSouceTypeId: 65,
    //   lstConfigItems: this.configItems,
    //   _GrossSP: this.worksheetDetailsCard[0].grossSPQC,
    //   _GrossSPBC: this.worksheetDetailsCard[0].grossSPBC,
    //   _NetSP: this.worksheetDetailsCard[0].netSPQC,
    //   _NetSPBC: this.worksheetDetailsCard[0].netSPBC,
    //   _SplDiscActual: this.worksheetDetailsCard[0].specialDiscountPC,
    //   taxPC: this.worksheetDetailsCard[0].taxPC,
    //   taxTypeId: this.worksheetDetailsCard[0].taxTypeId,
    //   lstLeadProducts: this.productItems,
    //   gstExemptionPC: this.worksheetDetailsCard[0].gstExemptionPC,
    //   gstExemptionValue: this.worksheetDetailsCard[0].gstExemptedValue,
    //   lstPaymentTerms: this.paymentTerms,
    //   _AdjWsQuoteValueBC: this.worksheetDetailsCard[0].quoteValueBC,
    //   _AdjWsQuoteValue: this.worksheetDetailsCard[0].quoteValueQC,
    //   saveType: "Approve",
    //   createdBy: this.loginService.employeeId,
    //   operationMode: "Approve",
    //   appRejComments: "",
    //   isPriced: true,
    //   tax: 0,
    //   _VAT: this.worksheetDetailsCard[0].vat,
    //   _SGST: this.worksheetDetailsCard[0].sgst,
    //   _CGST: this.worksheetDetailsCard[0].cgst,
    //   _IGST: this.worksheetDetailsCard[0].igst,
    //   isDutyFree: this.worksheetDetailsCard[0].isDutyFree,
    //   isLeadLevelDiscount: this.worksheetDetailsCard[0].isLeadLevelDiscount,
    //   isProdLevelDiscount: this.worksheetDetailsCard[0].isProductLevelDiscount,
    //   isItemLevelDiscount: this.worksheetDetailsCard[0].isItemLevelDiscount,
    //   isFlatAmount: this.worksheetDetailsCard[0].isFlatAmount,
    //   otherCommitmentRemarks: this.worksheetDetailsCard[0].otherCommitmentRemarks == null? "": this.worksheetDetailsCard[0].otherCommitmentRemarks,
    //   level1Comments: formData.priceDetails.amComments,
    //   level2Comments: formData.priceDetails.smComments,
    //   level3Comments: formData.priceDetails.finComments,
    //   level4Comments: formData.priceDetails.mgmtComments,
    //   isDiscExempted: this.worksheetDetailsCard[0].isDiscountCapExempted,
    //   isPriceEdited: this.worksheetDetailsCard[0].isPriceEdited,
    //   wsDocumentGUID: "",
    //   wsDocumentSouceTypeId: 658,
    //   outPut: ""
    // };  
    const body = this.assignWorksheetParam(formData, enqID, "Approve");
    console.log("Body Json Approve", body);
    return this.http.put(this.postSaveWorksheetUrl, body);
  }

  postRejectEnquiry(formData: any,enqID: number) {
    const body = this.assignWorksheetParam(formData, enqID, "Reject");
    console.log("Body Json Reject", body);
    return this.http.put(this.postSaveWorksheetUrl, body);
  }

  resetValues(){
    this.worksheetDetailsCard = [];
    this.WorksheetPrerequisites = [];
    this.paymentTerms = [];
    this.productItems = [];
    this.configItems = [];
    this.wsattachments = [];
  }
}
