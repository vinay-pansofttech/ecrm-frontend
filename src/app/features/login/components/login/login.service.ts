import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/core/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = `${this.configService.apiUrl}/api/Login/CheckLoginDetails`;
  private logoutUrl = `${this.configService.apiUrl}/api/Login/UserLogout`;

  public employeeId: string | number = '';
  private employeeName = '';
  public privileges: string[] = [];
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {}

  loginUser(body: unknown) {
    return this.http.post(this.loginUrl, body);
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
