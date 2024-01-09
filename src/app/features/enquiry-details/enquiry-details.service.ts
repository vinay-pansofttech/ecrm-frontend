import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsConfigKey } from 'src/app/core/Constants';
import { LoginService } from '../login/components/login/login.service';

interface EnquiryTypeBody {
  soldToLEID: string | number;
  soldToContactID: any;
  soldToLESiteID: any;
  regionID: string | number;
  salesChannelID: any;
  salesExecutiveID: any;
  workflowID: any;
  generatedFromID: any;
  quoteCompanyID: any;
  quoteCurrencyID: any;
  enquiryDescription: any;
  loginID: number | string;
  generatedByID?: any; // Make generatedByID property optional
}
@Injectable({
  providedIn: 'root',
})
export class EnquiryDetailsService {
  private loginUrl = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetLEContacts`;
  private generatedFrom = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetGeneratedFrom`;
  private salesWorkflow = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetSalesWorkflow`;
  private salesChannel = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetSalesChannel`;
  private quoteEntityCompany = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetQuoteCompany`;
  private fetchFunnelWorklistUrl = `${AppSettingsConfigKey.APIURL}/api/Enquiry/FetchFunnelWorklist`;
  private accountLogDetails = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetAccountLogDetails`;

  public regionId: string | number = '';
  public leID: string | number = '';
  public salesExecID: string | number = '';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}
  getSoldToContactsList() {
    const url = `${this.loginUrl}`;
    return this.http.get(url);
  }
  getSoldToSiteList(contactId: number) {
    const url = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetLESiteByContact`;
    const body = {
      leContactID: contactId,
    };
    return this.http.post(url, body);
  }

  getRegionFromSiteList(siteId: number) {
    const url = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetLegalEntityRegionBySite`;
    const body = {
      leSiteID: siteId,
    };
    return this.http.post(url, body);
  }
  getAddEnquiry(formData: any) {
    const url = `${AppSettingsConfigKey.APIURL}/api/Enquiry/AddEnquiry`;
    const body: EnquiryTypeBody = {
      soldToLEID: this.leID,
      soldToContactID: formData.contactDteails.soldToContact,
      soldToLESiteID: formData.contactDteails.soldToSite,
      regionID: this.regionId,
      salesChannelID: formData.enquiryDetailsForms.salesChannel,
      salesExecutiveID: this.salesExecID,
      workflowID: formData.enquiryDetailsForms.salesWorkFlow,
      generatedFromID: formData.enquiryDetailsForms.generatedFrom,
      quoteCompanyID: formData.enquiryDetailsForms.quoteEntityCompany,
      quoteCurrencyID: formData.enquiryDetailsForms.quoteEntityCurrency,
      enquiryDescription: formData.enquiryDescription.enterDescription,
      loginID: this.loginService.employeeId,
    };
    if (formData.enquiryDetailsForms.generatedBy) {
      body.generatedByID = formData.enquiryDetailsForms.generatedBy;
    } else {
      body.generatedByID = 0;
    }
    return this.http.post(url, body);
  }

  getgeneratedFrom() {
    return this.http.get(this.generatedFrom);
  }
  getgeneratedBy(generatedFrom: string) {
    const url = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetGeneratedBy`;

    const body = {
      generatedFrom: generatedFrom,
    };
    return this.http.post(url, body);
  }

  getquoteEntityCompany() {
    return this.http.get(this.quoteEntityCompany);
  }

  getquoteEntityCurrency(companyID: number) {
    const url = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetQuoteCurrencyByCompany`;

    const body = {
      quoteCompanyID: companyID,
    };
    return this.http.post(url, body);
  }
  getsalesWorkFlow() {
    return this.http.get(this.salesWorkflow);
  }
  getsalesChannel() {
    return this.http.get(this.salesChannel);
  }
  getsalesExecutive(
    enId: string | number,
    leId: string | number,
    salesChannelID: string | number,
    leSiteID: string | number
  ) {
    const url = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetSalesExecutives`;

    const body = {
      enqId: enId,
      leid: leId,
      salesChannelID,
      leSiteID,
    };
    return this.http.post(url, body);
  }

  getEnquirylist() {
    const body = {
      loginID: this.loginService.employeeId,
    };
    return this.http.post(this.fetchFunnelWorklistUrl, body);
  }

  getEnquiryDetailsHistory(){
    const body={
      enqID:152789
    };
    return this.http.post(this.accountLogDetails, body);
  }

  getupdateEnqDropdown() {
    const updateEnqDropdownUrl = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetUpdateEnqDropdowns`;
    return this.http.get(updateEnqDropdownUrl);
  }

  updateEnquiryDetails(updateBody: any) {
    const url = `${AppSettingsConfigKey.APIURL}/api/Enquiry/UpdateEnquiry`;
    return this.http.put(url, updateBody);
  }
}
