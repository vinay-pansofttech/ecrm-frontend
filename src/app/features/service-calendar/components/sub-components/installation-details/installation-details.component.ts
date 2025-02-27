import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/features/common/common.service';
import { ServiceCalendarService, svcGetSRLCDetails } from '../../../service-calendar.service';

@Component({
  selector: 'app-installation-details',
  templateUrl: './installation-details.component.html',
  styleUrl: './installation-details.component.scss'
})
export class InstallationDetailsComponent implements OnInit{
  @Input() public installationDetails!: FormGroup;
  @Input() srlcDetails: svcGetSRLCDetails[] = [];
  showAPILoader: boolean = false;

  constructor(
    public commonService : CommonService,
    public serviceCalendarService: ServiceCalendarService
  ){}

  ngOnInit(): void {
    // this.patchFormValues('installationDetails');
    this.subscribe();
  }

  // patchFormValues(formGroupName: string){
  //   if (this.serviceCalendarService.hasPatchedMap[formGroupName]) return;
  //   this.serviceCalendarService.hasPatchedMap[formGroupName] = true;

  //   this.installationDetails.patchValue({
  //     productSerialNo: this.srlcDetails[0].serialNumber? this.srlcDetails[0].serialNumber: '',
  //     sapNo: this.srlcDetails[0].sapNo? this.srlcDetails[0].sapNo: '',
  //     productCategory: this.srlcDetails[0].productCategory? this.srlcDetails[0].productCategory: '',
  //     leTag: this.srlcDetails[0].customerTagNo? this.srlcDetails[0].customerTagNo: '',
  //     location: this.srlcDetails[0].custSiteLocation? this.srlcDetails[0].custSiteLocation: '',
  //     principalWarrantyStart: this.srlcDetails[0].warrantyStartDate? this.commonService.convertDateStringToDate(this.srlcDetails[0].warrantyStartDate): null,
  //     principalWarrantyEnd: this.srlcDetails[0].warrantyFinishDate? this.commonService.convertDateStringToDate(this.srlcDetails[0].warrantyFinishDate): null,
  //     clientWarrantyStart: this.srlcDetails[0].extendedWarStartDate? this.commonService.convertDateStringToDate(this.srlcDetails[0].extendedWarStartDate): null,
  //     clientWarrantyEnd: this.srlcDetails[0].extendedWarEndDate? this.commonService.convertDateStringToDate(this.srlcDetails[0].extendedWarEndDate): null,      
  //   });
  // }

  subscribe(){
    this.installationDetails.get('principalWarrantyStart')?.valueChanges.subscribe(() => {
      this.validateDates();
    });
    this.installationDetails.get('principalWarrantyEnd')?.valueChanges.subscribe(() => {
      this.validateDates();
    });
    this.installationDetails.get('clientWarrantyStart')?.valueChanges.subscribe(() => {
      this.validateDates();
    });
    this.installationDetails.get('clientWarrantyEnd')?.valueChanges.subscribe(() => {
      this.validateDates();
    });
  }

  validateDates() {
    const principalWarrantyStart = this.installationDetails.get('principalWarrantyStart') as FormControl;
    const principalWarrantyEnd = this.installationDetails.get('principalWarrantyEnd') as FormControl;
    const clientWarrantyStart = this.installationDetails.get('clientWarrantyStart') as FormControl;
    const clientWarrantyEnd = this.installationDetails.get('clientWarrantyEnd') as FormControl;
    
    const principalWarrantyStartDate = principalWarrantyStart?.value;
    const principalWarrantyEndDate = principalWarrantyEnd?.value;
    const clientWarrantyStartDate = clientWarrantyStart?.value;
    const clientWarrantyEndDate = clientWarrantyEnd?.value;
  
    let principalEndErrors = null;
    let clientEndErrors = null;
  
    if (principalWarrantyStartDate && principalWarrantyEndDate && principalWarrantyStartDate > principalWarrantyEndDate) {
      principalEndErrors = { required: true, dateInvalid: 'Principal warranty end date should be greater than start date' };
    }
  
    if (clientWarrantyStartDate && clientWarrantyEndDate && clientWarrantyStartDate > clientWarrantyEndDate) {
      clientEndErrors = { required: true, dateInvalid: 'Client warranty end date should be greater than start date' };
    }
  
    principalWarrantyEnd.setErrors(principalEndErrors);
    clientWarrantyEnd.setErrors(clientEndErrors);
  }
  
}
