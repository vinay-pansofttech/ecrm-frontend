import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCalendarService, engEffortsList } from '../../service-calendar.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-efforts-list-view',
  templateUrl: './efforts-list-view.component.html',
  styleUrls: ['./efforts-list-view.component.scss']
})
export class EffortsListViewComponent {
  csrGenerateForm!: FormGroup;
  engeffortListCards: engEffortsList[] = [];
  srid: number = 0;
  currentDate: string = '';
  showAPILoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private loaderService: LoaderService,
    private serviceCalendarService: ServiceCalendarService,
    private datePipe : DatePipe,
  ) {}

  ngOnInit(): void {
    this.csrGenerateForm = this.formBuilder.group({
      csrComments: new FormControl(null ,Validators.required),
    });
    const idString = this.route.snapshot.paramMap.get('id');
    this.currentDate = this.route.snapshot.paramMap.get('Date')!;
    if (idString !== null) {
      const idNumber: number = parseInt(idString, 10);
      this.srid = idNumber;   
    }
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.loaderService.hideLoader();
    this.engEffortsList();
  }

  engEffortsList() {
    this.loaderService.showLoader();
    this.serviceCalendarService.getEngEfforts(this.loginService.employeeId as number, this.srid).subscribe((data: any) => {
      this.engeffortListCards = data.filter(
        (item: any) => item.empId === this.loginService.employeeId
      );
      this.loaderService.hideLoader();
    },
    error => {
      this.loaderService.hideLoader();
    });
  }

  iseditable(cardIndex: number): boolean{
    const cardemployeeId = this.engeffortListCards[cardIndex].empId;
    const selectedDate = this.datePipe.transform(new Date(this.currentDate),"yyyy-MM-dd")!;
    const today = this.datePipe.transform(new Date(),"yyyy-MM-dd")!;
    if (selectedDate <= today && this.loginService.employeeId == cardemployeeId) {
       return true;
    } else {
      return false;
    }
  }

  addEffort(cardIndex: number){
    this.router.navigate(['/service-efforts', cardIndex, this.srid, this.currentDate]);
  }

  onBackClickHandle() {
    this.serviceCalendarService.resetValues();
    this.router.navigate(['/service-calendar']);
  }

  onRefresh(){
    this.engEffortsList();
  }

  generateCSR(){
    const formValue = this.csrGenerateForm.value;
    this.serviceCalendarService.csrComments = formValue.csrComments? formValue.csrComments: "";
    console.log('CSRComments', formValue.csrComments);
    this.router.navigate(['/csr-generator']);
  }

}
