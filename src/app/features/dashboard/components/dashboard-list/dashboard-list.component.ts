import { Component, OnInit } from '@angular/core';
import landingPageList from '../../data/mock.json';

type landingPageList = {
  text1: string;
  text2: string;
  image: string;
};
@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent implements OnInit  {

  landingPageCard!:landingPageList[];
  ngOnInit(): void {
    this.landingPageCard = [landingPageList.landingPageList][0];
  }

  buttonClicked = false;

  onButtonClick() {
    this.buttonClicked = !this.buttonClicked;
    this.landingPageCard.push(...this.landingPageCard2);
  }

  landingPageCard2=[
    
      {
        text1:"Sales for Sep 2023",
        text2:"Rs 2,71,000",
        image:"dashboard-sales-icon"
      },
      {
        text1:"Sales for Sep 2023",
        text2:"Rs 2,71,000",
        image:"dashboard-sales-icon"
      },
      {
        text1:"Sales for Sep 2023",
        text2:"Rs 2,71,000",
        image:"dashboard-sales-icon"
      },
      {
        text1:"Sales for Sep 2023",
        text2:"Rs 2,71,000",
        image:"dashboard-sales-icon"
      },
      {
        text1:"Sales for Sep 2023",
        text2:"Rs 2,71,000",
        image:"dashboard-sales-icon"
      },
    
  ]

}
