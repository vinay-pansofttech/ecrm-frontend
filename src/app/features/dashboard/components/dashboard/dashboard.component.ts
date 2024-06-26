import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bellIcon, menuIcon, SVGIcon } from "@progress/kendo-svg-icons";
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { DrawerItem, DrawerMode } from "@progress/kendo-angular-layout";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}
  isDrawerOpen = false;
  public menuIcon: SVGIcon = menuIcon;
  public bellIcon: SVGIcon = bellIcon;
  public expandMode: DrawerMode = "overlay";

  public items: Array<DrawerItem> = [
    { separator: true },
    { text: "Notifications", svgIcon: bellIcon},
  ];

  getEmployeeName(): string {
    return this.loginService.getEmployeeName();
  }
  getInitials(name: string): string {
    const initials = name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
    return initials;
  }
}

