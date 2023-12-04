import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent {



  cards=[
    {
      image:"dashboard-quickaction-sales-icon",
      text:"Sales",

    },
    {
      image:"dashboard-enquiry-icon",
      text:"Enquiry"
    },
    {
      image:"dashboard-update-icon",
      text:"Update"
    },

  ]

  setColor(text:string){
    switch(true) {
      case text  === 'Sales' :
        return '#daf0ef';
        break;
      case text=== 'Enquiry' :
        return '#cbd4f5'
        break;
      case text=== 'Update' :
        return  '#d5d8db'
        break;
    
    }
    console.log(text);
    return '#F2F2F2';
  }

  servicecards=[
    {
      image:"dashboard-calendar-icon",
      text:"My Calendar"
    },
    {
      image:"dashboard-trackers-icon",
      text:"Trackers"
    },
    {
      image:"dashboard-MyTask-icon",
      text:"My Tasks"
    },
    {
      image:"dashboard-telephone-icon",
      text:"Telephone"
    },
  ]

  getColor(text:string){
    switch(true) {
      case text  === 'My Calendar' :
        return '#605CA3';
        break;
      case text=== 'Trackers' :
        return '#4BA560'
        break;
      case text=== 'My Tasks' :
        return  '#CC5642'
        break;
        case text=== 'Telephone' :
        return  '#B9305B'
        break;
    
    }
    console.log(text);
    return '#F2F2F2';
  }
  
}
