import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCalendarService } from '../../service-calendar.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { DatePipe } from '@angular/common';

interface engEffortsList {
  empId: number;
  srid: number;
  name: string;
  ondate: string;
  effortHours: string;
  travelHours: string;
  taskType: string;
  remarks: string;
}

@Component({
  selector: 'app-efforts-list-view',
  templateUrl: './efforts-list-view.component.html',
  styleUrls: ['./efforts-list-view.component.scss']
})
export class EffortsListViewComponent {
  engeffortListCards: engEffortsList[] = [];
  srid: number = 0;
  currentDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private serviceCalendarService: ServiceCalendarService,
    private datePipe : DatePipe
  ) {}

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    this.currentDate = this.route.snapshot.paramMap.get('Date')!;
    if (idString !== null) {
      const idNumber: number = parseInt(idString, 10);
      this.srid = idNumber;   
    }
    this.engEffortsList();
  }

  engEffortsList() {
    this.serviceCalendarService.getEngEfforts(this.loginService.employeeId as number, this.srid).subscribe((data: any) => {
      this.engeffortListCards = data.filter(
        (item: any) => item.ondate === this.datePipe.transform(new Date(this.currentDate),"yyyy-MM-dd")
        && (item.empId) === this.loginService.employeeId
      );
    });
  }

  iseditable(cardIndex: number): boolean{
    const cardemployeeId = this.engeffortListCards[cardIndex].empId;
    if(this.loginService.employeeId == cardemployeeId)
      return true;
    else
      return false;
  }

  addEffort(cardIndex: number){
    this.router.navigate(['/service-efforts', cardIndex, this.srid, this.currentDate]);
  }

  onBackClickHandle() {
    this.router.navigate(['/service-calendar']);
  }

  onRefresh(){
    this.engEffortsList();
  }

}
