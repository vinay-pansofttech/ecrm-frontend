import { Component,Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-enquiry-description',
  templateUrl: './enquiry-description.component.html',
  styleUrls: ['./enquiry-description.component.scss']
})
export class EnquiryDescriptionComponent {
  @Input()
  public enquiryDescription!: FormGroup;
}
