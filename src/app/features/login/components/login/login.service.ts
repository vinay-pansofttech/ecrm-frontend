import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsConfigKey } from 'src/app/core/Constants';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = `${AppSettingsConfigKey.APIURL}/api/Login/CheckLoginDetails`;
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
}
