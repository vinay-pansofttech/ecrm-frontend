import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsConfigKey } from 'src/app/core/Constants';
@Injectable({
  providedIn: 'root',
})
export class EnquiryDetailsService {
  private loginUrl = `${AppSettingsConfigKey.APIURL}/api/Enquiry/GetLEContacts`;
  constructor(private http: HttpClient) {}
  getSoldToContactsList() {
    const url = `${this.loginUrl}`;
    return this.http.get(url);
  }
}
