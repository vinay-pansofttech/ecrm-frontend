import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './features/login/components/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate(): boolean {
    const loginID = this.loginService.employeeId;

    if (loginID === '') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
