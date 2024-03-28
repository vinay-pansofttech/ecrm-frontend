import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  contactDetailsFormState: any = {};
  enquiryDetailsFormState: any = {};
  selectedcompany:any={};
  selectedContact: any = null;
  selectedsales:any = null;
  attachments: any = [];
  enqId!: any;
  regionId!: any;
  soldToLEId!: any;
  salesExecutiveId!: any;
  constructor() {}

  ngOnInit(){
    this.resetValues();
  }

  resetValues(){
    this.contactDetailsFormState = null;
    this.enquiryDetailsFormState = null;
    this.selectedcompany = null;
    this.selectedContact = null;
    this.selectedsales = null;
    this.attachments = null;
    this.enqId = null;
    this.salesExecutiveId = null;
    this.regionId = null;
    this.soldToLEId = null;
  }
}