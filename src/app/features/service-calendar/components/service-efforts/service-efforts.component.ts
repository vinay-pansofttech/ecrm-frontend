import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServiceCalendarService } from '../../service-calendar.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NotificationService } from 'src/app/core/services/notification.service';

interface engEffortsList {
  sRSchId: number;
  subTaskId: number;
  calendarId: number;
  ondate: string;
  startTime: string;
  endTime: string;
  effortHours: string;
  travelHours: string;
  isNoEffortSpent: boolean;
  remarks: string;
  subTaskScheduleDtlId: number;
}

@Component({
  selector: 'app-service-efforts',
  templateUrl: './service-efforts.component.html',
  styleUrls: ['./service-efforts.component.scss']
})
export class ServiceEffortsComponent {
  serviceEffortsForm!: FormGroup;
  srid: number = 0;
  currentDate: string | null  = '';
  engeffortListCards: engEffortsList[] = [];
  effortCardDetails: any;
  cardIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private serviceCalendarService: ServiceCalendarService,
    private loginService: LoginService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.serviceEffortsForm = this.formBuilder.group({
        efforthours: new FormControl(null ,Validators.required),
        travelhours: new FormControl(null, Validators.nullValidator),
        effortremarks: new FormControl('', Validators.required),
    });
    const idString = this.route.snapshot.paramMap.get('id');
    this.currentDate = this.route.snapshot.paramMap.get('Date');
    const cardIndexString = this.route.snapshot.paramMap.get('index');

    if (idString !== null) {
      const idNumber: number = parseInt(idString, 10);
      this.srid = idNumber;   
    }
    if (cardIndexString !== null) {
      const cardIndexnumber: number = parseInt(cardIndexString, 10);
      this.cardIndex = cardIndexnumber;   
    }
    this.getEngEffortsList();
  }

  getEngEffortsList() {
    this.serviceCalendarService.getEngEfforts(this.loginService.employeeId as number, this.srid).subscribe((data: any) => {
      this.engeffortListCards = data;
      console.log('carddata',data);
      this.effortCardDetails = data[this.cardIndex];
      console.log(this.effortCardDetails);
      this.patchFormValues();
    });
  }

  patchFormValues(){
    this.serviceEffortsForm.patchValue({
      efforthours:this.effortCardDetails.effortHours,
      travelhours: this.effortCardDetails.travelHours,
      effortremarks: this.effortCardDetails.remarks
    });
  }

  onBackClickHandle() {
    window.history.back();
  }

  assignFormData(): any {
    const formValue = this.serviceEffortsForm.value;
    if (this.effortCardDetails) {
      return {
        sRSchId: this.effortCardDetails.srSchId,
        subTaskId: this.effortCardDetails.subTaskId,
        calendarId: this.effortCardDetails.calendarId,
        onDate: this.effortCardDetails.ondate,
        startTime: "",
        endTime: "",
        effortHours: parseFloat(formValue.efforthours),
        travelHours: formValue.travelHours !=0 ? parseFloat(formValue.travelhours) : 0,
        isNoEffortSpent: this.effortCardDetails.isNoEffortSpent,
        remarks: formValue.effortremarks,
        subTaskScheduleDtlId: this.effortCardDetails.subTaskScheduleDtlId,
        srid: this.srid
      };
    }
    return null;
  }

  submit() {
    if (this.serviceEffortsForm.valid) {
      const formData = this.assignFormData();
      console.log(formData);
      if (formData) {
        this.loaderService.showLoader();
        this.serviceCalendarService.putServiceEfforts(formData)
          .subscribe(data => {
            console.log('after submit', data);
            this.loaderService.hideLoader();
            this.notificationService.showNotification(
              'Efforts updated successfully',
              'success', 'center', 'bottom'
            );
            window.history.back();
          });
      } else {
        console.error('No firstEffort available');
      }
    } else {
      this.serviceEffortsForm.markAllAsTouched();
    }
  }

  onRefresh(){
    this.ngOnInit();
  }

}
