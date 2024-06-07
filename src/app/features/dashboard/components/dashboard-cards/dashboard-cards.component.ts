import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import quickCards from '../../data/mock.json';
import moduleCards from '../../data/mock.json';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { IconsModule } from '@progress/kendo-angular-icons';

type quickCards = {
  image: string;
  text: string;
  path: string;
};

type moduleCards = {
  image: string;
  text: string;
};
@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  cards!: quickCards[];
  moduleCards!: moduleCards[];
  userPrivileges: string[] = [];
  ngOnInit(): void {
    this.cards = [quickCards.quickCards][0];
    this.userPrivileges = this.loginService.privileges;
    this.moduleCards = [moduleCards.moduleCards][0];
  }

  setColor(text: string) {
    switch (true) {
      case text === 'Sales':
        return '#daf0ef';
        break;
      case text === 'Enquiry':
        return '#cbd4f5';
        break;
      case text === 'Update':
        return '#d5d8db';
        break;
    }
    console.log(text);
    return '#F2F2F2';
  }

  getColor(text: string) {
    switch (true) {
      case text === 'My Calendar':
        return '#605CA3';
        break;
      case text === 'Trackers':
        return '#4BA560';
        break;
      case text === 'My Tasks':
        return '#CC5642';
        break;
      case text === 'Telephone':
        return '#B9305B';
        break;
    }
    console.log(text);
    return '#F2F2F2';
  }
  handleCardNavigate(cardData: any) {
    if (cardData.path === 'enquiry-details') {
      this.router.navigate([cardData.path]);
    }
    if (cardData.path === 'enquiry-listview') {
      this.router.navigate([cardData.path]);
    }
    if (cardData.path === 'service-calendar') {
      this.router.navigate([cardData.path]);
    }
    if (cardData.path === 'worksheet-details') {
      this.router.navigate([cardData.path]);
    }
    if (cardData.path === 'sales-parts-management') {
      this.router.navigate([cardData.path]);
    }
  }
  showCards(cardType: any): boolean {
    // If the card type is 'Funnel Update', show it only if the user has the 'prvViewSales' privilege.
    if(cardType.text === 'Funnel Update'){
      return !(
        !this.userPrivileges?.includes('prvViewSales')
      );
    }
    else if(cardType.text === 'Worksheet'){
      return !(
        !this.userPrivileges?.includes('prvViewSales')
      );
    }
    else if(cardType.text === 'Service Calls'){
      return !(
        !this.userPrivileges?.includes('prvSalesPrepConfig')
      );
    }
    else if(cardType.text === 'Sales Parts Management'){
      return !(
        !this.userPrivileges?.includes('prvSalesPartsMgmt')
      );
    }
    else{
      return true;
    }
  }
  getEmployeeName(): string {
    return this.loginService.getEmployeeName();
  }
  getEmployeeFirstName(): string {
    const EmpFullName = this.getEmployeeName();
    const FirstName = EmpFullName.slice(0, EmpFullName.indexOf(' '));
    return FirstName as string;
  }
  getIconName(image: string): IconName {
    // Assuming all your icons are valid FontAwesome icon names
    return image as unknown as IconName;
  }
}
