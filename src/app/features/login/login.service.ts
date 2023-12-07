import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettingsConfigKey } from 'src/app/core/Constants';

@Injectable({
  providedIn: 'root',
})
export class Loginervice {
  private loginUrl = `${AppSettingsConfigKey.APIURL}/api/Login/CheckLoginDetails`;

  constructor(private http: HttpClient) {}

  loginUser(body: any): Observable<any> {
    const url = `${this.loginUrl}`;

    return this.http.post(url, body);
  }
}
