import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { LoaderService } from 'src/app/core/services/loader.service';
import { EnquiryDetailsService } from '../../enquiry-details.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormStateService } from '../../form-state.service';

@Component({
  selector: 'app-enquiry-details',
  templateUrl: './enquiry-details.component.html',
  styleUrls: ['./enquiry-details.component.scss'],
})
export class EnquiryDetailsComponent implements OnInit {
  public currentStep = 0;
  showAPILoader = false;
  invalid = false;
  public getAddEnquiry: unknown = [];
  @ViewChild('stepper', { static: true })
  public stepper!: StepperComponent;

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
      disabled: true,
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
    private notificationService: NotificationService,
    private formStateService: FormStateService
  ) {}
  ngOnInit(): void {
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.loaderService.hideLoader();
    this.formStateService.resetValues();
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
    });
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
  }

  onStepSelect(event: any): void{
    this.ngOnInit();
  }

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
  }

  public prev(): void {
    this.currentStep -= 1;
  }

  public submit(): void {
    if (!this.currentGroup.valid) {
      this.currentGroup.markAllAsTouched();
      this.stepper.validateSteps();
    }
    if (this.enquiryCaptureForm.valid) {
      this.loaderService.showLoader();
      this.enquiryDetailsService
        .getAddEnquiry(this.enquiryCaptureForm.value)
        .subscribe(data => {
          this.loaderService.hideLoader();
          this.notificationService.showNotification(
            'Created enquiry successfully',
            'success','center','bottom'
          );
          this.router.navigate(['/enquiry-listview']);
        },
        error => {
          this.loaderService.hideLoader();;
          this.notificationService.showNotification(
            'Enquiry not created',
            'error', 'center', 'bottom'
          );
        });
        this.formStateService.resetValues();
    }
    this.loaderService.showLoader();
    this.enquiryCaptureForm.markAllAsTouched();
  }

  private getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.enquiryCaptureForm.controls).map(
      groupName => this.enquiryCaptureForm.get(groupName)
    ) as FormGroup[];

    return groups[index];
  }

  onBackClickHandle() {
    this.router.navigate(['/dashboard']);
    this.formStateService.resetValues();
  }

  onReset() {
    this.enquiryCaptureForm.reset();
  }
}
