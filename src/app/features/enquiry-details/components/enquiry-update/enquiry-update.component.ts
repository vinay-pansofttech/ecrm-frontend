import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-enquiry-update',
  templateUrl: './enquiry-update.component.html',
  styleUrls: ['./enquiry-update.component.scss'],
})
export class EnquiryUpdateComponent implements OnInit {
  public currentStep = 3;
  showAPILoader = false;
  invalid=false;

  constructor(
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
  }
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
    if(this.enquiryUpdateForm.valid){
      this.enquiryUpdateForm.markAllAsTouched();

    }
    
    this.loaderService.showLoader();
    console.log('loader', this.loaderService.loaderState, this.showAPILoader);
    this.enquiryUpdateForm.markAllAsTouched();
    console.log(this.enquiryUpdateForm.value);
    setTimeout(() => {
      this.loaderService.hideLoader();
      this.router.navigate(['/work-list']);
    }, 3000);
  }

  onReset() {
    this.enquiryUpdateForm.reset();
  }

}
