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
  @Input() filteredEngeffortListCards: engEffortsList[] = [];
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
    this.csrGenerateForm.patchValue({
      csrComments: this.serviceCalendarService.csrComments? this.serviceCalendarService.csrComments: null
    });
  }

  iseditable(cardIndex: number): boolean {
    const selectedCard = this.filteredEngeffortListCards[cardIndex];
    const today = this.datePipe.transform(new Date(), "yyyy-MM-dd")!;
    const srTask = this.engeffortListCards.find(card => card.taskType === "Site Readiness");

    // If there is an SR task, it must be completed before allowing other tasks
    if (srTask) {
        if (selectedCard.taskType === 'Site Readiness') {
            if (selectedCard.remarks === null && selectedCard.ondate <= today && this.loginService.employeeId === selectedCard.empId) {
                return true;
            }
            return false;
        }
        
        if (selectedCard.remarks === null || selectedCard.remarks === undefined) {
            return false;
        }
    }

    // Allow editing of other tasks only if there are no PIR or SR tasks, and conditions are met
    if (selectedCard.ondate <= today && this.loginService.employeeId === selectedCard.empId) {
        return true;
    }

    return false;
  }

  addEffort(cardIndex: number){
    this.otherEngEffortsList = this.engeffortListCards.filter(
      (item: any) => item.remarks != null && this.commonService.displayDateFormat(item.ondate) != this.currentDate
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
