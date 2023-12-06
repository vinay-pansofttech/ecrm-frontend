import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  public areaList: Array<string> = [
    "Miami",
    "New York",
    "Philadelphia"
  ];
  public area:Array<string> = [
    "Boston",
    "Chicago",
    "Houston"
  ];
  public list:Array<string> = [
    "New York",
    "San Francisco",
    "Seattle",
  ];

 
}
