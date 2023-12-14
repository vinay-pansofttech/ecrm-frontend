import { Component, OnInit } from '@angular/core';
import salesList from '../../data/mock.json';

type salesList = {
  text1: string;
  text2: string;
  image: string;
};
@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent implements OnInit {
  salesCard!: salesList[];
  ngOnInit(): void {
    this.salesCard = [salesList.salesList][0];
  }

  buttonClicked = false;

  onButtonClick() {
    this.buttonClicked = !this.buttonClicked;
    this.salesCard.push(...this.SalesCard2);
  }

  SalesCard2 = [
    {
      text1: 'Sales for Sep 2023',
      text2: 'Rs 2,71,000',
      image: 'dashboard-sales-icon',
    },
    {
      text1: 'Sales for Sep 2023',
      text2: 'Rs 2,71,000',
      image: 'dashboard-sales-icon',
    },
    {
      text1: 'Sales for Sep 2023',
      text2: 'Rs 2,71,000',
      image: 'dashboard-sales-icon',
    },
    {
      text1: 'Sales for Sep 2023',
      text2: 'Rs 2,71,000',
      image: 'dashboard-sales-icon',
    },
    {
      text1: 'Sales for Sep 2023',
      text2: 'Rs 2,71,000',
      image: 'dashboard-sales-icon',
    },
  ];
}
