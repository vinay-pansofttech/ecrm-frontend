import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppRoutePaths } from 'src/app/core/Constants';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CommonService } from 'src/app/features/common/common.service';
import { ServiceCalendarService, engEffortsList } from '../../service-calendar.service';

@Component({
  selector: 'app-efforts-list-view',
  templateUrl: './efforts-list-view.component.html',
  styleUrls: ['./efforts-list-view.component.scss']
})
export class EffortsListViewComponent {
  csrGenerateForm!: FormGroup;
  @Input() engeffortListCards: engEffortsList[] = [];
  @Input() srid: number = 0;
  @Input() currentDate: string = '';
  showAPILoader = false;

  otherEngEffortsList: engEffortsList[] = [];
  effortCardDetails!: engEffortsList;
  isEditEffortOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private loaderService: LoaderService,
    public commonService: CommonService,
    private serviceCalendarService: ServiceCalendarService,
    private datePipe : DatePipe,
  ) {}

  ngOnInit(): void {
    this.csrGenerateForm = this.formBuilder.group({
      csrComments: new FormControl(null ,Validators.required),
    });
    this.loaderService.loaderState.subscribe(res => {
      this.showAPILoader = res;
    });
    this.loaderService.hideLoader();
  }

  iseditable(cardIndex: number): boolean{
    const cardemployeeId = this.engeffortListCards[cardIndex].empId;
    const scheduledDate = this.engeffortListCards[cardIndex].ondate;
    const today = this.datePipe.transform(new Date(),"yyyy-MM-dd")!;
    if (scheduledDate <= today && this.loginService.employeeId == cardemployeeId) {
       return true;
    } else {
      return false;
    }
  }

  addEffort(cardIndex: number){
    this.otherEngEffortsList = this.engeffortListCards.filter(
      (item: any) => this.commonService.displayDateFormat(item.ondate) != this.currentDate
    );
    this.effortCardDetails = this.engeffortListCards[cardIndex];
    this.isEditEffortOpen = true;
  }

  onBackClickHandle() {
    this.serviceCalendarService.resetValues();
    this.router.navigate([AppRoutePaths.ServiceCalendar]);
  }

  EditEffortClose(){
    this.isEditEffortOpen = false;
  }

  onRefresh(){
    this.ngOnInit();
  }

  generateCSR(){
    const formValue = this.csrGenerateForm.value;
    this.serviceCalendarService.csrComments = formValue.csrComments? formValue.csrComments: "";
    this.router.navigate([AppRoutePaths.ServiceCSRGenerator]);
  }

}
