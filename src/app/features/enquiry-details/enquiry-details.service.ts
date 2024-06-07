import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsConfigKey } from 'src/app/core/Constants';
import { LoginService } from '../login/components/login/login.service';
import { DatePipe } from '@angular/common';

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
  attachment: any;
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
  private attachmentDetails = `${AppSettingsConfigKey.APIURL}/api/UploadDownload/GetAttachmentDetails`;
  private downloadAttachment = `${AppSettingsConfigKey.APIURL}/api/UploadDownload/DownloadAttachment`;


  public regionId: string | number = '';
  public leID: string | number = '';
  public salesExecID: string | number = '';
  public poExpectedDate: string | number = '';
  public soldToLESiteID: string | number = '';
  public docSrcTypeAttachment: any = 22;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private datePipe: DatePipe
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
    // const body: EnquiryTypeBody = {
    //   soldToLEID: this.leID,
    //   soldToContactID: formData.contactDteails.soldToContact,
    //   soldToLESiteID: formData.contactDteails.soldToSite,
    //   regionID: this.regionId,
    //   salesChannelID: formData.enquiryDetailsForms.salesChannel,
    //   salesExecutiveID: this.salesExecID,
    //   workflowID: formData.enquiryDetailsForms.salesWorkFlow,
    //   generatedFromID: formData.enquiryDetailsForms.generatedFrom,
    //   quoteCompanyID: formData.enquiryDetailsForms.quoteEntityCompany,
    //   quoteCurrencyID: formData.enquiryDetailsForms.quoteEntityCurrency,
    //   enquiryDescription: formData.enquiryDescription.enterDescription,
    //   loginID: this.loginService.employeeId,
    //   attachment: formData.enquiryDescription.attachment,
    // };
    // if (formData.enquiryDetailsForms.generatedBy) {
    //   body.generatedByID = formData.enquiryDetailsForms.generatedBy;
    // } else {
    //   body.generatedByID = 0;
    // }
    const attachmentfile =
    formData.enquiryDescription.attachment && formData.enquiryDescription.attachment.length > 0
          ? formData.enquiryDescription.attachment[0]
          : null;
    if (attachmentfile) {
      formData.enquiryDescription.attachment = attachmentfile;
    } else {
      formData.enquiryDescription.attachment = '';
    }  

    const body = new FormData();
    body.append('soldToLEID', this.leID as string);
    body.append('soldToContactID', formData.contactDteails.soldToContact);
    body.append('soldToLESiteID', formData.contactDteails.soldToSite);
    body.append('regionID', this.regionId as string);
    body.append('salesChannelID', formData.enquiryDetailsForms.salesChannel);
    body.append('salesExecutiveID', this.salesExecID as string);
    body.append('workflowID', formData.enquiryDetailsForms.salesWorkFlow);
    body.append('generatedFromID', formData.enquiryDetailsForms.generatedFrom);
    body.append('quoteCompanyID', formData.enquiryDetailsForms.quoteEntityCompany);
    body.append('quoteCurrencyID', formData.enquiryDetailsForms.quoteEntityCurrency);
    body.append('enquiryDescription', formData.enquiryDescription.enterDescription);
    body.append('loginID', this.loginService.employeeId as string);
    body.append('docSrcType', this.docSrcTypeAttachment);
    body.append('attachment', formData.enquiryDescription.attachment);
    if (formData.enquiryDetailsForms.generatedBy) {
      body.append('generatedByID', formData.enquiryDetailsForms.generatedBy);
    } else {
      body.append('generatedByID', String(0) );
    }
    console.log('body for add',body);
    return this.http.put(url, body);
  }

  getUpdateEnquiry(formData: any,enqID: string) {
    const url = `${AppSettingsConfigKey.APIURL}/api/Enquiry/UpdateEnquiryAllStepper`;
    const file =
    formData.enquiryUpdateForm.interaction_attachment && formData.enquiryUpdateForm.interaction_attachment.length > 0
          ? formData.enquiryUpdateForm.interaction_attachment[0]
          : null;
    if (file) {
      formData.enquiryUpdateForm.interaction_attachment = file;
    } else {
      formData.enquiryUpdateForm.interaction_attachment = '';
    }

    const attachmentfile =
    formData.enquiryDescription.attachment && formData.enquiryDescription.attachment.length > 0
          ? formData.enquiryDescription.attachment[0]
          : null;
    if (attachmentfile) {
      formData.enquiryDescription.attachment = attachmentfile;
    } else {
      formData.enquiryDescription.attachment = '';
    }  
    
    const formattedDate = formData.enquiryUpdateForm.poExpectedDate
      ? this.datePipe.transform(formData.enquiryUpdateForm.poExpectedDate, 'dd/MM/yyyy')
      : null;

    const body = new FormData();
    body.append('soldToLEID', this.leID as string);
    body.append('soldToContactID', formData.contactDteails.soldToContact);
    body.append('soldToLESiteID', formData.contactDteails.soldToSite);
    body.append('regionID', this.regionId as string);
    body.append('salesChannelID', formData.enquiryDetailsForms.salesChannel);
    body.append('salesExecutiveID', this.salesExecID as string);
    body.append('workflowID', formData.enquiryDetailsForms.salesWorkFlow);
    body.append('generatedFromID', formData.enquiryDetailsForms.generatedFrom);
    body.append('quoteCompanyID', formData.enquiryDetailsForms.quoteEntityCompany);
    body.append('quoteCurrencyID', formData.enquiryDetailsForms.quoteEntityCurrency);
    body.append('enquiryDescription', formData.enquiryDescription.enterDescription);
    body.append('loginID', this.loginService.employeeId as string);
    body.append('attachment', formData.enquiryDescription.attachment);
    body.append('enqId', enqID);
    body.append('remarks', formData.enquiryUpdateForm.remarksValue);
    body.append('probabilityID', formData.enquiryUpdateForm.probability);
    body.append('dealPositionID', formData.enquiryUpdateForm.dealPosition);
    body.append('dealValue', formData.enquiryUpdateForm.dealValue);
    body.append('poExpectedDate', formattedDate as string);
    body.append('modeOfCommunicationID', formData.enquiryUpdateForm.modeOfCommunication);
    body.append('docSrcType', this.docSrcTypeAttachment);
    body.append('interaction_attachment', formData.enquiryUpdateForm.interaction_attachment);

    if (formData.enquiryDetailsForms.generatedBy) {
      body.append('generatedByID', formData.enquiryDetailsForms.generatedBy);
    } else {
      body.append('generatedByID', String(0) );
    }
    console.log('Update Body',body);
    return this.http.put(url, body);
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
      salesChannelID: salesChannelID,
      LESiteID: leSiteID,
    };
    return this.http.post(url, body);
  }

  getEnquirylist() {
    const body = {
      loginID: this.loginService.employeeId,
    };
    return this.http.post(this.fetchFunnelWorklistUrl, body);
  }

  getEnquiryDetailsHistory(endId: string) {
    const body = {
      enqID: endId,
    };
    return this.http.post(this.accountLogDetails, body);
  }

  getupdateEnqDropdown() {
    const updateEnqDropdownUrl = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetUpdateEnqDropdowns`;
    return this.http.get(updateEnqDropdownUrl);
  }

  getEnquiryDetails(enqID: string | null) {
    const enquiryDetailsurl = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetEnqDetails`;
    const body = {
      enqID,
      loginID: this.loginService.employeeId,
    };

    return this.http.post(enquiryDetailsurl, body);
  }
  updateEnquiryDetails(updateBody: any) {
    const url = `${AppSettingsConfigKey.APIURL}/api/Enquiry/UpdateEnquiry`;
    return this.http.put(url, updateBody);
  }

  getAttachmentDetails(enqID: string, docSrcType: number, docSrcGUID: string) {
    const url = this.attachmentDetails;

    const body = {
      docSrcVal: enqID.toString(),
      docSrcType: docSrcType,
      docSrcGUID: docSrcGUID
    };
    return this.http.post(url, body);
  }

  getAttachment(enqID: string, docSrcType: number, attachmentGUID: string, index: number) {
    const url = this.downloadAttachment;

    const body = {
      docSrcVal: enqID.toString(),
      docSrcType: docSrcType,
      docSrcGUID: attachmentGUID,
      index: index
    };
    return this.http.post(url, body, {responseType: 'blob', observe: 'response'});
  }
  
}
