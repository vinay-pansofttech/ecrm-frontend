import { Component, Input} from '@angular/core';
import { FormGroup } from "@angular/forms";
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

  @Input()
  public contactDetails!: FormGroup;
}
