import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsConfigKey } from 'src/app/core/Constants';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = `${AppSettingsConfigKey.APIURL}/api/Login/CheckLoginDetails`;
  constructor(private http: HttpClient) {}
  loginUser(body: unknown) {
    const url = `${this.loginUrl}`;
    return this.http.post(url, body);
  }
}