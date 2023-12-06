import { Component } from '@angular/core';

@Component({
  selector: 'app-enquiry-details',
  templateUrl: './enquiry-details.component.html',
  styleUrls: ['./enquiry-details.component.scss']
})
export class EnquiryDetailsComponent {
  public steps = [
    {
      label: "Contact Details",
      link:"contact-details",
      isValid:true
    },
    {
      label: "Enquiry Details",
      link:"enquiry-details",
      isValid:false
    },
    {
      label: "Enquiry Description",
      link:"enquiry-description",
      isValid:true
    },
    {
      label: "Enquiry Update",
      link:"enquiry-update",
      isValid:true
    }
  ];
current:any;
}
