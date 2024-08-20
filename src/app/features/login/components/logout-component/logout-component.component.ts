import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-logout-component',
  templateUrl: './logout-component.component.html',
  styleUrls: ['./logout-component.component.scss'],
})
export class LogoutComponent {
  constructor(
    public router: Router,
    private loginService: LoginService,
    private notificationService: NotificationService
  ) {}

  handleLogout() {
    this.loginService.logoutUser().subscribe((data: any) => {
      if (data) {
        const notificationMessage = data.outPut;
        const notificationType = data.outPut.indexOf('success') !== -1 ? 'success' : 'error';
        this.notificationService.showNotification(
          notificationMessage,
          notificationType,
          'center',
          'bottom'
        );
      }
    },        
    error => {
      this.notificationService.showNotification(
        'Error logging out',
        'error', 'center', 'bottom'
      );
    });
    this.loginService.employeeId = '';
    this.router.navigate(['/login']);
  }
}
