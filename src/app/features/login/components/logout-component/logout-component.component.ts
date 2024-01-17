import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-logout-component',
  templateUrl: './logout-component.component.html',
  styleUrls: ['./logout-component.component.scss'],
})
export class LogoutComponent {
  constructor(
    public router: Router,
    private loginService: LoginService
  ) {}
  handleLogout() {
    this.loginService.employeeId = '';
    this.router.navigate(['/login']);
  }
}
