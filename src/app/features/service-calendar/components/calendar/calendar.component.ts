import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCalendarService, callsList } from '../../service-calendar.service';
import { CommonService } from 'src/app/features/common/common.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  isCalendarOpen: boolean = false;
  schCallCards: callsList[] = [];
  SRID: number = 0;
  showAPILoader = false;

  constructor(
    private router: Router,
    private serviceCalendarService: ServiceCalendarService,
    private loginService: LoginService,
    private loaderService: LoaderService,
    private datePipe: DatePipe,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    if( this.serviceCalendarService.selectedDate != undefined){
      this.currentDate = this.serviceCalendarService.selectedDate;
    }
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.loaderService.hideLoader();
    this.enquiryList();
  }

  enquiryList() {
    this.loaderService.showLoader();
    this.serviceCalendarService.getScheduledCalls(this.loginService.employeeId as number, this.currentDate).subscribe((data: any) => {
      this.schCallCards = data;
      this.serviceCalendarService.selectedDate = this.currentDate;
      this.loaderService.hideLoader();
    },
    error => {
      this.loaderService.hideLoader();;
    });
  }

  onBackClickHandle() {
    this.serviceCalendarService.selectedDate = new Date();
    this.serviceCalendarService.resetValues();
    this.router.navigate(['/dashboard']);
  }

  onPrevDateClickHandle() {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() - 1);
    this.currentDate = newDate;  
    this.enquiryList();
  }

  onNextDateClickHandle() {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + 1);
    this.currentDate = newDate;  
    this.enquiryList();
  }

  updateServiceCalendarDate(newDate: Date) {
    this.currentDate = newDate;
    this.isCalendarOpen = false;
    this.enquiryList();
  }

  openCloseCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  onScheduledCallClick(SRID: number, index: number) {
      this.serviceCalendarService.selectedSRID = SRID;
      this.serviceCalendarService.selectedCallCompletion = this.schCallCards[index].isCallCompleted;
      this.serviceCalendarService.selectedCallCat = this.schCallCards[index].callCategory;
      this.router.navigate(['/srlc',SRID,this.commonService.displayDateFormat(this.currentDate)]);
  }

  convertDateFormat(currentDate: Date){
    const formattedDate = currentDate
    ? this.datePipe.transform(currentDate, 'dd-MMM-yyyy')
    : null;
    return formattedDate as string;
  }

  callPhoneNumber(phoneNumber: string): void {
    window.location.href = 'tel:' + phoneNumber;
  }

  sendEmail(emailAddress: string): void {
    window.location.href = 'mailto:' + emailAddress;
  }

  openLocation(locationName: string): void {
    window.open('https://maps.google.com/?q=' + locationName, '_blank');
  }

  onRefresh(){
    this.enquiryList();
    this.serviceCalendarService.resetValues();
  }

}
