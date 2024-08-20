import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServiceCalendarService, engEffortsDetails, engEffortsList } from '../../service-calendar.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-service-efforts',
  templateUrl: './service-efforts.component.html',
  styleUrls: ['./service-efforts.component.scss']
})
export class ServiceEffortsComponent {
  serviceEffortsForm!: FormGroup;
  srid: number = 0;
  currentDate: string  = '';
  engeffortListCards: engEffortsList[] = [];
  effortCardDetails: any;
  cardIndex: number = 0;
  isPrevEffortsOpen: boolean = false;
  isEffortsDisabled: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private serviceCalendarService: ServiceCalendarService,
    private loginService: LoginService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.serviceEffortsForm = this.formBuilder.group({
        startTime: new FormControl(null ,Validators.nullValidator),
        endTime: new FormControl(null ,Validators.nullValidator),
        efforthours: new FormControl(null ,Validators.required),
        travelhours: new FormControl(null, Validators.nullValidator),
        effortremarks: new FormControl('', Validators.required),
    });
    const idString = this.route.snapshot.paramMap.get('id');
    this.currentDate = this.route.snapshot.paramMap.get('Date')!;
    const cardIndexString = this.route.snapshot.paramMap.get('index');

    if (idString !== null) {
      const idNumber: number = parseInt(idString, 10);
      this.srid = idNumber;   
    }
    if (cardIndexString !== null) {
      const cardIndexnumber: number = parseInt(cardIndexString, 10);
      this.cardIndex = cardIndexnumber;   
    }

    this.serviceEffortsForm.get('startTime')?.valueChanges.subscribe(() => {
      this.calculateEffortHours();
    });

    this.serviceEffortsForm.get('endTime')?.valueChanges.subscribe(() => {
      this.calculateEffortHours();
    });

    this.getEngEffortsList();
  }

  getEngEffortsList() {
    this.serviceCalendarService.getEngEfforts(this.loginService.employeeId as number, this.srid).subscribe((data: any) => {
      this.engeffortListCards = data;
      this.effortCardDetails = data.filter(
        (item: any) => item.empId === this.loginService.employeeId
      );
      if(this.effortCardDetails.length > 0) {
        this.effortCardDetails = this.effortCardDetails[this.cardIndex];
        this.patchFormValues();
      }
      else{
        console.log('Effort is null');
      }
    });
  }

  timeStringToDate (timeString: string): Date | null {
    if (!timeString) return null;
    
    const [hours, minutes, seconds] = timeString.split(':');
    
    const date = new Date();
    date.setHours(+hours);
    date.setMinutes(+minutes);
    date.setSeconds(+seconds.split('.')[0]);
    
    return date;
  }

  patchFormValues(){
    this.serviceEffortsForm.patchValue({
      startTime:this.effortCardDetails.startTime? this.timeStringToDate(this.effortCardDetails.startTime): "",
      endTime:this.effortCardDetails.endTime? this.timeStringToDate(this.effortCardDetails.endTime): "",
      efforthours:this.effortCardDetails.effortHours,
      travelhours: this.effortCardDetails.travelHours,
      effortremarks: this.effortCardDetails.remarks
    });
  }

  onBackClickHandle() {
    window.history.back();
  }

  isPrevEffortsOpened(){
    this.isPrevEffortsOpen = !this.isPrevEffortsOpen;
  }

  assignFormData(): any {
    const formValue = this.serviceEffortsForm.value;
    if (this.effortCardDetails) {
      return {
        sRSchId: this.effortCardDetails.srSchId,
        subTaskId: this.effortCardDetails.subTaskId,
        calendarId: this.effortCardDetails.calendarId,
        onDate: this.effortCardDetails.ondate,
        startTime: formValue.startTime? formValue.startTime: '',
        endTime: formValue.endTime? formValue.endTime: '',
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
      if (formData) {
        this.loaderService.showLoader();
        this.serviceCalendarService.putServiceEfforts(formData)
          .subscribe(data => {
            this.loaderService.hideLoader();
            this.notificationService.showNotification(
              'Efforts updated successfully',
              'success', 'center', 'bottom'
            );
            window.history.back();
          });
      } else {
        console.error('No Effort available');
      }
    } else {
      this.serviceEffortsForm.markAllAsTouched();
    }
  }

  onRefresh(){
    this.ngOnInit();
  }

  calculateEffortHours() {
    const startTime: Date = this.serviceEffortsForm.get('startTime')?.value;
    const endTime: Date = this.serviceEffortsForm.get('endTime')?.value;

    if (startTime && endTime) {
      const diffMs = endTime.getTime() - startTime.getTime();

      if (diffMs > 0) {
        const diffHours = diffMs / 1000 / 60 / 60;
        const roundedHours = Math.round(diffHours * 100) / 100;
        this.serviceEffortsForm.get('efforthours')?.setValue(roundedHours.toFixed(2));
        this.serviceEffortsForm.get('endTime')?.setErrors(null);
      } else {
        this.serviceEffortsForm.get('efforthours')?.setValue('');
        this.serviceEffortsForm.get('endTime')?.setErrors({ invalidTime: true });
      }
    } else {
      this.serviceEffortsForm.get('efforthours')?.setValue('');
      if (!endTime) {
        this.serviceEffortsForm.get('endTime')?.setErrors(null);
      }
    }
  }
  

}
