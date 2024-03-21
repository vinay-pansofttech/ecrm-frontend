import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  contactDetailsFormState: any = {};
  selectedContact: any = null;
  constructor() {}
}
