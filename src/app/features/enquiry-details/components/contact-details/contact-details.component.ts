import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnquiryDetailsService } from '../../enquiry-details.service';

type SoleToContact = {
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

type SoldToSite = {
  leSiteID: number;
  leSiteName: string;
  isSiteActive: boolean;
  comboType: string;
  leContactID: number;
};

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  public soldToContact: unknown = [];
  public soldToSite: unknown = [];
  public regionsList: unknown = [];
  constructor(public enquiryDetailsService: EnquiryDetailsService) {}
  ngOnInit(): void {
    this.enquiryDetailsService.getSoldToContactsList().subscribe(data => {
      this.soldToContact = data;
    });
  }

  @Input()
  public contactDetails!: FormGroup;
  handleSoldToContactChanged(contact: SoleToContact) {
    if (contact && contact?.contactID) {
      this.enquiryDetailsService
        .getSoldToSiteList(contact.contactID)
        .subscribe(res => {
          this.soldToSite = res;
        });
    }
  }

  handleSoldToSiteChanged(site: SoldToSite) {
    this.enquiryDetailsService
      .getRegionFromSiteList(site.leSiteID)
      .subscribe((res:any) => {
        this.regionsList = res || '';
        this.contactDetails.patchValue({
          region: res[0]?.comboName ,// Patch only the 'region' FormControl value
     
          soldToLE: res[1]?.comboName
      
        });
      });
  }
}
