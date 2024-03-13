import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { LoaderService } from 'src/app/core/services/loader.service';
import { EnquiryDetailsService } from '../../enquiry-details.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ContactDetailsComponent } from 'src/app/features/enquiry-details/components/contact-details/contact-details.component';

@Component({
  selector: 'app-enquiry-details-update',
  templateUrl: './enquiry-details-update.component.html',
  styleUrls: ['./enquiry-details-update.component.scss']
})

export class EnquiryDetailsUpdateComponent {
  public currentStep = 3;
  showAPILoader = false;
  invalid = false;
  public getAddEnquiry: unknown = [];
  @ViewChild('stepper', { static: true })
  public stepper!: StepperComponent;
  id!: string | null;
  poExpectedDate: Date = new Date();
  enqId!: string;
  modeOfCommunicationValue = false;
  modeOfCommunicationControl!: FormControl;

  private isStepValid = (index: number): boolean => {
    return this.getGroupAt(index).valid || this.currentGroup.untouched;
  };

  private shouldValidate = (index: number): boolean => {
    return this.getGroupAt(index)?.touched && this.currentStep >= index;
  };

  public steps = [
    {
      label: 'Contact Details',
      isValid: this.isStepValid,
      validate: this.shouldValidate,
      icon: '',
    },
    {
      label: 'Enquiry Details',
      isValid: this.isStepValid,
      validate: this.shouldValidate,
      icon: '',
    },
    {
      label: 'Enquiry Description',
      isValid: this.isStepValid,
      validate: this.shouldValidate,
      icon: '',
    },
    {
      label: 'Deal Number',
      isValid: this.isStepValid,
      validate: this.shouldValidate,
      icon: '',
    },
  ];
  current: any;

  enquiryCaptureForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    public enquiryDetailsService: EnquiryDetailsService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private contactDetailsComponent: ContactDetailsComponent
  ) {}

  ngOnInit(): void {
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.loaderService.hideLoader();
    this.enquiryCaptureForm = this.formBuilder.group({
      contactDteails: new FormGroup({
        soldToContact: new FormControl('', Validators.required),
        soldToSite: new FormControl('', Validators.required),
        soldToLE: new FormControl(
          { value: '', disabled: true },
          Validators.required
        ),
        region: new FormControl(
          { value: '', disabled: true },
          Validators.required
        ),
      }),
      enquiryDetailsForms: new FormGroup({
        generatedBy: new FormControl(''),
        generatedFrom: new FormControl('', [Validators.required]),
        quoteEntityCompany: new FormControl('', [Validators.required]),
        quoteEntityCurrency: new FormControl('', [Validators.required]),
        salesWorkFlow: new FormControl('', [Validators.required]),
        salesChannel: new FormControl('', [Validators.required]),
        salesExecutive: new FormControl('', [Validators.required]),
      }),
      enquiryDescription: new FormGroup({
        enterDescription: new FormControl('', [Validators.required]),
        attachment: new FormControl('', [Validators.required]),
      }),
      enquiryUpdateForm: new FormGroup({
        enqId: new FormControl(this.enqId ,Validators.nullValidator),
        poExpectedDate: new FormControl('', Validators.required),
        dealPosition: new FormControl('', Validators.required),
        probability: new FormControl('', Validators.required),
        dealValue: new FormControl('', Validators.required),
        currency: new FormControl('', Validators.required),
        modeOfCommunication: new FormControl('', Validators.nullValidator),
        remarksValue: new FormControl('', Validators.nullValidator),
        interaction_attachment: new FormControl([null], Validators.nullValidator),
      })
    });
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getEnqdetails();
    this.modeOfCommunicationControl = this.enquiryCaptureForm.get('enquiryUpdateForm.modeOfCommunication') as FormControl;

    if (this.modeOfCommunicationControl) {
      this.modeOfCommunicationControl.valueChanges.subscribe((modeValue) => {
        this.updateValidatorsBasedOnMode(modeValue);
        this.modeOfCommunicationValue = this.modeOfCommunicationControl.value? true: false;
        this.updateValidatorsBasedOnMode(this.modeOfCommunicationValue);
      });
    }
  }

  private updateValidatorsBasedOnMode(modeValue: any): void {
    const remarksControl = this.enquiryCaptureForm.get('enquiryUpdateForm.remarksValue')!;
    const attachmentControl = this.enquiryCaptureForm.get('enquiryUpdateForm.interaction_attachment')!;
    modeValue? remarksControl.setValidators([Validators.required]) : remarksControl.setValidators(null);
    remarksControl.updateValueAndValidity();
    !this.modeOfCommunicationValue? attachmentControl.disable():attachmentControl.enable();
    this.enquiryCaptureForm.markAllAsTouched();
  }

  public dealPositionList: Array<string> = [];
  public probabilityList: Array<string> = [];
  public enquiryModeList: Array<string> = [];
  public dealPositionDefaultValue: {
    comboID: unknown;
    comboName: unknown;
    comboType: string;
    isActive: boolean;
  } | null = null;
  public SoldToContact: {
    contactID: number;
    contactName: string;
    isContactActive: boolean;
    comboType: string;
    contactEmailID: string;
    leDeptId: number;
    departmentName: string;
    leSiteId: number;
    siteName: string;
  } | null = null;

  public get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  public next(): void {
    if (this.currentGroup.valid && this.currentStep !== this.steps.length) {
      this.currentStep += 1;
      return;
    }
    this.currentGroup.markAllAsTouched();
    this.stepper.validateSteps();
    this.getEnqdetails();
  }

  public prev(): void {
    this.currentStep -= 1;
    this.getEnqdetails();
  }

  public submit(): void {
    if (!this.currentGroup.valid) {
      this.currentGroup.markAllAsTouched();
      this.stepper.validateSteps();
    }
    console.log(this.enquiryCaptureForm.value);
    if (this.enquiryCaptureForm.valid) {
      this.loaderService.showLoader();
      this.enquiryDetailsService
        .getUpdateEnquiry(this.enquiryCaptureForm.value, this.enqId)
        .subscribe(data => {
          console.log('after submit', data);
          this.loaderService.hideLoader();
          this.notificationService.showNotification(
            'Updated enquiry successfully',
            'success', 'center', 'bottom'
          );
          this.router.navigate(['/enquiry-listview']);
        });
    }
    this.loaderService.showLoader();
    console.log('loader', this.loaderService.loaderState, this.showAPILoader);
    this.enquiryCaptureForm.markAllAsTouched();
    console.log(this.enquiryCaptureForm);
  }

  private getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.enquiryCaptureForm.controls).map(
      groupName => this.enquiryCaptureForm.get(groupName)
    ) as FormGroup[];

    return groups[index];
  }

  getEnqdetails() {
    this.enquiryDetailsService
      .getEnquiryDetails(this.id)
      .subscribe((res: any) => {
        if (this.enquiryCaptureForm.get('enquiryUpdateForm.dealPosition')) {
          this.enqId = res[0].enqID;
          this.dealPositionDefaultValue = {
            comboID: res[0]?.dealPositionID,
            comboName: res[0]?.dealPosition,
            comboType: 'DEALPOSITION',
            isActive: true,
          };
          this.SoldToContact = {
            contactID: res[0]?.soldToContactID,
            contactName: res[0]?.soldToContact,
            isContactActive: true,
            comboType: "ALLCONTACTS",
            contactEmailID: res[0]?.soldToContactEmail,
            leDeptId: 5269,
            departmentName: "QC",
            leSiteId: res[0]?.soldToSiteID,
            siteName: res[0]?.soldToSite
          };
          console.log('SoldToContact',this.SoldToContact);
          this.currentGroup.enable();
          this.currentGroup.patchValue({
            soldToContact: res[0]?.soldToContactID,
            soldToSite: res[0]?.soldToSiteID,
            soldToLE: res[0]?.soldToLE,
            region: res[0]?.region,
            generatedFrom: res[0]?.generatedFromID,
            generatedByName: res[0]?.generatedByName,
            quoteCompany: res[0]?.quoteCompanyID,
            quoteCurrency:res[0]?.quoteCurrencyID,
            salesWorkflow: res[0]?.salesWorkFlowID,
            salesChannel: res[0]?.salesChannelID,
            salesExecutive: res[0]?.salesExecutiveID,
            enterDescription: res[0]?.enquiryDescription,
            poExpectedDate: new Date(res[0]?.poExpectedDate),
            dealPosition: this.dealPositionDefaultValue.comboID,
            probability: res[0]?.probabilityID,
            dealValue: res[0]?.dealValue,
            currency: res[0]?.quoteCurrency,
          });
          //this.contactDetailsComponent.handleSoldToContactChanged(this.SoldToContact);
          this.modeOfCommunicationValue = this.modeOfCommunicationControl.value? true: false;
          this.updateValidatorsBasedOnMode(this.modeOfCommunicationValue);
        }
      });
  }

  onBackClickHandle() {
    this.router.navigate(['enquiry-listview']);
  }

  onReset() {
    this.enquiryCaptureForm.reset();
    this.getEnqdetails();
    this.enquiryCaptureForm.get('enquiryUpdateForm.modeOfCommunication')?.setValue('');
  }

}

