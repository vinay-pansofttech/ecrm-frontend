import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsConfigKey } from 'src/app/core/Constants';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = `${AppSettingsConfigKey.APIURL}/api/Login/CheckLoginDetails`;
  private logoutUrl = `${AppSettingsConfigKey.APIURL}/api/Login/UserLogout`;

  public employeeId: string | number = '';
  private employeeName = '';
  public privileges: string[] = [];
  constructor(private http: HttpClient) {}
  loginUser(body: unknown) {
    const url = `${this.loginUrl}`;
    return this.http.post(url, body);
  }
  getEmployeeName(): string {
    return this.employeeName;
  }
  setEmployeeName(name: string): void {
    this.employeeName = name;
  }
  logoutUser(){
    const body = {
      UserID: this.employeeId as number,
    }
    return this.http.post(this.logoutUrl, body);
  }
}
