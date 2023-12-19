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
@Component({
  selector: 'app-enquiry-details',
  templateUrl: './enquiry-details.component.html',
  styleUrls: ['./enquiry-details.component.scss'],
})
export class EnquiryDetailsComponent implements OnInit {
  public currentStep = 0;
  showAPILoader = false;
  invalid=false

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
      label: 'Enquiry Update',
      disabled: true,
      icon: '',
    },
  ];
  current: any;

  enquiryCaptureForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private loaderService: LoaderService,
    private router: Router) {}
  ngOnInit(): void {
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.enquiryCaptureForm = this.formBuilder.group({
      contactDteails: new FormGroup({
        soldToContact: new FormControl('', Validators.required),
        soldToSite: new FormControl('', Validators.required),
        soldToLE: new FormControl({value: '', disabled: true}, Validators.required, ),
        region: new FormControl({value: '', disabled: true}, Validators.required),
      }),
      enquiryDetailsForms: new FormGroup({
        generatedBy: new FormControl('', [Validators.required]),
        generatedFrom: new FormControl('', [Validators.required]),
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
      console.log('Submitted data', this.enquiryCaptureForm.value);
      setTimeout(() => {
        this.loaderService.hideLoader();
        this.router.navigate(['/work-list']);
      }, 3000);
    }
    this.loaderService.showLoader();
    console.log('loader', this.loaderService.loaderState, this.showAPILoader);
    this.enquiryCaptureForm.markAllAsTouched();
    console.log(this.enquiryCaptureForm.value);
    setTimeout(() => {
      this.loaderService.hideLoader();
      this.router.navigate(['/enquiry-update']);
    }, 3000);
  }
 

  private getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.enquiryCaptureForm.controls).map(
      groupName => this.enquiryCaptureForm.get(groupName)
    ) as FormGroup[];

    return groups[index];
  }

  onBackClickHandle() {
    this.router.navigate(['/dashboard']);
  }

  onReset() {
    this.enquiryCaptureForm.reset();
  }
  
}
