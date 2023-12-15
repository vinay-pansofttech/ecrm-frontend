import { Component } from '@angular/core';
import { bellIcon, menuIcon, SVGIcon } from "@progress/kendo-svg-icons";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public menuIcon: SVGIcon = menuIcon;
  public bellIcon: SVGIcon = bellIcon;
}
