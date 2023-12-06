import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent {
  onClick(){
    this.SalesCard.push(...this.SalesCard2);
 }

  SalesCard=[
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

  SalesCard2=[
    
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
