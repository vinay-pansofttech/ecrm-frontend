import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsConfigKey } from 'src/app/core/Constants';
import { LoginService } from '../login/components/login/login.service';
import { DatePipe } from '@angular/common';

export interface SPMWorklistItem {
  enqId: number;
  leadNo: string;
  customer: string;
  region: string;
  salesPerson: string;
  enqCategory: string;
  salesChannel: string;
  leadPosition: string;
  leadStatus: string;
  addPrtsCnt?: number;
  validatePrtsCnt?: number;
  validatePriceCnt: number;
  mapHsnCnt?: number;
  gstMissingCnt?: number;
  preVaidateComments: string;
  hasPreVaidateRights?: number;
  isPreValidator?: number;
}

export interface SPMSupplierListItem {
  supplierDocId: number;
  supplierId: number;
  supplierName?: string;
  attachmentGuId?: string;
  remarks?: string;
  isDisable?: boolean | null;
  isDocRequired?: boolean | null;
  suppCategory?: string;
  remarksMessage?: RemarksMessage[];
}

export interface SPMPartsListItem {
  supplierId?: number;
  supplier: string;
  supp_PartNo: string;
  supp_Option: string;
  manufacturerId?: number;
  manufacturer: string;
  mfgPartNo: string;
  mfgOption: string;
  description: string;
  productLineId?: number;
  productLine: string;
  categoryId?: number;
  category: string;
  subCategoryId?: number;
  subCategory: string;
  listPrice?: number;
  discountPC?: number;
  partsMasterId?: number;
  currency: string;
  isDutyApplicable?: boolean;
  isUnManagedSupplier?: boolean;
  commentsByPartsMgmtTeam?: string;
  salesProductId?: number;
  suppCategory: string;
  addPartsYes: string;
  addPartsComments: string;
  qty?: number;
  netTotalValue?: number;
  priceValidateComments: string;
  isSameCurrency?: boolean;
  isMfgPresent?: number;
  mfgProductLineID?: number;
  configItemId?: number;
  configSeqNo?: number;
  isCardSelected?: boolean; 
  isDescriptionOpen?: boolean;
}

export interface RemarksMessage {
  author: string;
  timestamp: string;
  content: string;
}

export interface ProductConfigItemsBO {
  listPrice: number;
  discountPC: number;
  partsMasterId: number;
  salesProductId: number;
  configItemId: number;
  isUnManagedSupplier: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class SalesPartsManagementService {
  private fetchSPMWorklistUrl = `${AppSettingsConfigKey.APIURL}/api/SalesPartsManagement/GetSPMWorklist`;
  private fetchSPMSupplierlistUrl = `${AppSettingsConfigKey.APIURL}/api/SalesPartsManagement/GetSPMSupplierlist`;
  private fetchSPMPartslistUrl = `${AppSettingsConfigKey.APIURL}/api/SalesPartsManagement/GetSPMPartslist`;
  private postSPMPriceValidation = `${AppSettingsConfigKey.APIURL}/api/SalesPartsManagement/UpdatePriceValidation`;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private datePipe: DatePipe
  ) {}

  getSPMWorkList(loginId: number) {
    const body = {
      loginId: loginId,
    };
    return this.http.post(this.fetchSPMWorklistUrl, body);
  }

  getSPMSupplierList(loginId: number, enqId: number) {
    const body = {
      loginId: loginId,
      enqId: enqId
    };
    return this.http.post(this.fetchSPMSupplierlistUrl, body);
  }

  getSPMPartslist(loginId: number, enqId: number, supplierId: number){
    const body = {
      loginId: loginId,
      enqId: enqId,
      type: "",
      supplierId: supplierId
    };
    return this.http.post(this.fetchSPMPartslistUrl, body);
  }

  updatePriceValidation(loginId: number, validateComments: string, buttonType: string, lstLeadProductConfig: ProductConfigItemsBO[]){
    const body = {
      buttonType: buttonType,
      createdBy: loginId,
      lstLeadProductConfig: lstLeadProductConfig,
      priceValidateComments: validateComments
    };
    console.log('Body for Price Validate', body);
    return this.http.post(this.postSPMPriceValidation, body);
  }
  
}
