import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import quickCards from '../../data/mock.json';
import moduleCards from '../../data/mock.json';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { IconName } from '@fortawesome/fontawesome-svg-core';

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
    console.log('test for routing');
    if (cardData.path === 'enquiry-details') {
      this.router.navigate([cardData.path]);
    }
    if (cardData.path === 'enquiry-listview') {
      this.router.navigate([cardData.path]);
    }
  }
  showCards(cardType: any): boolean {
    // If the card type is 'Funnel Update', show it only if the user has the 'prvViewSales' privilege.
    return !(
      cardType.text === 'Funnel Update' &&
      !this.userPrivileges?.includes('prvViewSales')
    );
  }
  getEmployeeName(): string {
    return this.loginService.getEmployeeName();
  }
  getIconName(image: string): IconName {
    // Assuming all your icons are valid FontAwesome icon names
    return image as unknown as IconName;
  }
}
