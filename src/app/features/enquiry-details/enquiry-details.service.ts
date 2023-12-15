import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsConfigKey } from 'src/app/core/Constants';
@Injectable({
  providedIn: 'root',
})
export class EnquiryDetailsService {
  private loginUrl = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetLEContacts`;

  private generatedFrom = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetGeneratedFrom`;
  private salesWorkflow =  `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetSalesWorkflow`;
  private salesChannel   = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetSalesChannel`;
  private generatedby = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetGeneratedBy`;
  private quoteEntityCompany=`${AppSettingsConfigKey.APIURL}/api/Enquiry/GetQuoteCompany`;
  constructor(private http: HttpClient) {}
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

  getgeneratedFrom(){
    return this.http.get(this.generatedFrom);
  }

  getsalesWorkFlow(){
    return this.http.get(this.salesWorkflow);
  }
 getsalesChannel(){
  return this.http.get(this.salesChannel)
 }

 postgeneratedBy(body : unknown){
  return this.http.post(this.generatedby ,body)
 }

 getquoteEntityCompany(){
  return this.http.get(this.quoteEntityCompany)
 }

}
