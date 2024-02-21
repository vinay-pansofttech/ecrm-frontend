import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { EnquiryDetailsService } from '../../enquiry-details.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enquiry-update',
  templateUrl: './enquiry-update.component.html',
  styleUrls: ['./enquiry-update.component.scss'],
})
export class EnquiryUpdateComponent implements OnInit {
  public currentStep = 3;
  showAPILoader = false;
  invalid = true;
  id!: string | null;
  poExpectedDate: Date = new Date();
  enqId!: string | null;
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    public enquiryDetailsService: EnquiryDetailsService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.enquiryDetailsService.getupdateEnqDropdown().subscribe((data: any) => {
      this.dealPositionList = data.filter(
        (item: any) => item.comboType === 'DEALPOSITION'
      );
      this.probabilityList = data.filter(
        (item: any) => item.comboType === 'PROBABILITY'
      );
      this.enquiryModeList = data.filter(
        (item: any) => item.comboType === 'ENQUIRYMODE'
      );
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getEnqdetails();
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
      label: 'Deal Number',
    },
  ];

  public dealPositionList: Array<string> = [];
  public probabilityList: Array<string> = [];
  public enquiryModeList: Array<string> = [];
  public dealPositionDefaultValue: {
    comboID: unknown;
    comboName: unknown;
    comboType: string;
    isActive: boolean;
  } | null = null;
  public enquiryUpdateForm: FormGroup = new FormGroup({
    poExpectedDate: new FormControl('', Validators.required),
    dealPosition: new FormControl('', Validators.required),
    probability: new FormControl('', Validators.required),
    dealValue: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    modeOfCommunication: new FormControl('', Validators.required),
    remarksValue: new FormControl('', Validators.required),
    attachment: new FormControl([null]),
  });
  public async updateEnquiryForm(): Promise<void> {
    if (this.enquiryUpdateForm.valid) {
      this.loaderService.showLoader();
      const formData = new FormData();
      const formValue = this.enquiryUpdateForm.value;
      const poExpectedDate = new Date(formValue.poExpectedDate);
      console.log('form valu', formValue.poExpectedDate);
      const formattedDate = poExpectedDate
        ? this.datePipe.transform(poExpectedDate, 'dd/MM/yyyy')
        : null;

      // Mapping form fields to the API fields
      formData.append('enqID', this.enqId as string);
      formData.append('remarks', formValue.remarksValue);
      formData.append('probabilityID', formValue.probability);
      formData.append('dealPositionID', formValue.dealPosition);
      formData.append('dealValue', formValue.dealValue);
      formData.append('currency', formValue.currency);
      formData.append('loginID', String(this.loginService?.employeeId));
      formData.append('poExpectedDate', formattedDate as string);
      formData.append('modeOfCommunicationID', formValue.modeOfCommunication);
      // Handle the file attachment
      const file =
        formValue.attachment && formValue.attachment.length > 0
          ? formValue.attachment[0]
          : null;
      if (file) {
        formData.append('attachment', file);
        // Let's uncomment once backend is ready
      } else {
        formData.append('attachment', '');
      }

      this.enquiryDetailsService.updateEnquiryDetails(formData)?.subscribe(
        data => {
          console.log('after save', data);
          this.loaderService.hideLoader();
          this.router.navigate(['enquiry-listview']);
          this.notificationService.showNotification(
            'Data is Updated',
            'success',
          );
        },
        error => {
          // Handle any errors
          console.log('error', error);
          this.router.navigate(['/dashboard']);
          this.notificationService.showNotification(
            'Data Updated Failed',
            'error'
          );
        }
      );
    }
  }

  getEnqdetails() {
    this.enquiryDetailsService
      .getEnquiryDetails(this.id)
      .subscribe((res: any) => {
        console.log(res);
        if (this.enquiryUpdateForm.get('dealPosition')) {
          console.log('dealPosition from API:', res[0]?.dealPositionID);
          console.log('Probability from API:', res[0]?.probability);
          this.enqId = res[0].enqID;
          this.dealPositionDefaultValue = {
            comboID: res[0]?.dealPositionID,
            comboName: res[0]?.dealPosition,
            comboType: 'DEALPOSITION',
            isActive: true,
          };
          this.enquiryUpdateForm.enable();
          this.enquiryUpdateForm.patchValue({
            dealPosition: this.dealPositionDefaultValue.comboID,
            probability: res[0]?.probabilityID,
            dealValue: res[0]?.dealValue,
            poExpectedDate: new Date(res[0]?.poExpectedDate),
            currency: res[0]?.quoteCurrency,
          });
        }
      });
  }

  async handleUpdateEnquiryBody(formData: any, id: string | number) {
    return {
      enqID: id,
      remarks: formData.remarksValue,
      probabilityID: formData.probability,
      dealPositionID: formData.dealPosition,
      dealValue: formData.dealValue,
      currency: formData.currency,
      loginID: this.loginService.employeeId,
      POExpectedDate: formData.poExpectedDate,
      modeOfCommunicationID: formData.modeOfCommunication,
    };
  }

  onReset() {
    this.enquiryUpdateForm.reset();
  }
  handleHistoryButton() {
    this.router.navigate([`/enquiry-details-history/${this.id}`]);
  }
}
