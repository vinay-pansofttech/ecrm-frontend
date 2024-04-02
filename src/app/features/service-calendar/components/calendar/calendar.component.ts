import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCalendarService } from '../../service-calendar.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { DatePipe } from '@angular/common';


interface CallsList {
  srid: number;
  ueu: string;
  siteName: string;
  contactName: string;
  phoneNumber: string;
  primaryAddress: string;
  email: string;
  gpsCoordinate: string;
  productName: string;
  manufacturer: string;
  serialNumber: string;
  callCategory: string;
  callType: string;
  callDescription: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  isCalendarOpen: boolean = false;
  schCallCards: CallsList[] = [];
  SRID: number = 0;

  constructor(
    private router: Router,
    private serviceCalendarService: ServiceCalendarService,
    private loginService: LoginService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.enquiryList();
  }

  enquiryList() {
    this.serviceCalendarService.getScheduledCalls(this.loginService.employeeId as number, this.currentDate).subscribe((data: any) => {
      this.schCallCards = data;
    });
  }

  onBackClickHandle() {
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

  onScheduledCallClick(SRID: number) {
    this.router.navigate(['/service-efforts-listview',SRID,this.convertDateFormat(this.currentDate)]);
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
  }

}
