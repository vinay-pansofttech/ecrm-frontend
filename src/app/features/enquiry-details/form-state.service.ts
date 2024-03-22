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
  constructor() {}
}
