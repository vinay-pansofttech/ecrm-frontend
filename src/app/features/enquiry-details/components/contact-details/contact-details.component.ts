import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnquiryDetailsService } from '../../enquiry-details.service';

type soldToContactList = {
  contactID: number;
  contactName: string;
  isContactActive: boolean;
  comboType: string;
  contactEmailID: string;
  leDeptId: number;
  departmentName: string;
  leSiteId: number;
  siteName: string;
};
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  public areaList: unknown = [];
  public area: Array<string> = ['Boston', 'Chicago', 'Houston'];
  public list: Array<string> = ['New York', 'San Francisco', 'Seattle'];
  constructor(public enquiryDetailsService: EnquiryDetailsService) {}
  ngOnInit(): void {
    this.enquiryDetailsService.getSoldToContactsList().subscribe(data => {
      console.log('sold to contacts list', data);
      this.areaList = data;
    });
  }

  @Input()
  public contactDetails!: FormGroup;
}
