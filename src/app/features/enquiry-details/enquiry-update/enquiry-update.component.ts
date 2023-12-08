import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquiry-update',
  templateUrl: './enquiry-update.component.html',
  styleUrls: ['./enquiry-update.component.scss'],
})
export class EnquiryUpdateComponent {
  public currentStep = 3;

  public step = [
    {
      label: 'Contact Details',
      isValid: true,
    },
    {
      label: 'Enquiry Details',
      isValid: true,
    },
    {
      label: 'Enquiry Description',
      isValid: true,
    },
    {
      label: 'Enquiry Update',
    },
  ];
  public areaList: Array<string> = ['Miami', 'New York', 'Philadelphia'];
  public enquiryUpdateForm: FormGroup = new FormGroup({
    POExpectedDate: new FormControl('', Validators.required),
    dealPosition: new FormControl('', Validators.required),
    probability: new FormControl('', Validators.required),
    dealValue: new FormControl('', Validators.required),
    modeOfCommunication: new FormControl('', Validators.required),
    enterDescription: new FormControl('', Validators.required),
    attachment: new FormControl('', Validators.required),
  });
  public saveForm(): void {
    this.enquiryUpdateForm.markAllAsTouched();
    console.log(this.enquiryUpdateForm.value);
  }
}
