import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import quickCards from '../../data/mock.json';
import serviceCards from '../../data/mock.json';
type quickCards = {
  image: string;
  text: string;
  path: string;
};

type serviceCards = {
  image: string;
  text: string;
};
@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {

  constructor(private router: Router) {}
  
  cards!: quickCards[];
  servicecards!:serviceCards[];

  ngOnInit(): void {
    this.cards = [quickCards.quickCards][0];
    this.servicecards = [serviceCards.serviceCards][0];
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
  }
}
