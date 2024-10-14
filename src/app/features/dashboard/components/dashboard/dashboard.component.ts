import { Component, OnInit } from '@angular/core';
import { bellIcon, menuIcon, SVGIcon } from "@progress/kendo-svg-icons";
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { DrawerItem, DrawerMode } from "@progress/kendo-angular-layout";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  isDrawerOpen = false;
  public menuIcon: SVGIcon = menuIcon;
  public bellIcon: SVGIcon = bellIcon;
  public expandMode: DrawerMode = "overlay";

  public items: Array<DrawerItem> = [
    { separator: true },
    { text: "Notifications", svgIcon: bellIcon},
  ];

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
  }

  getEmployeeName(): string {
    return this.loginService.getEmployeeName();
  }

  //Getting initials for login image
  getInitials(name: string): string {
    const initials = name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
    return initials;
  }
  
}

