import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppRoutePaths } from 'src/app/core/Constants';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CommonService } from 'src/app/features/common/common.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { ServiceCalendarService, engEffortsList, callsList, svcPrerequisites } from '../../service-calendar.service';

@Component({
  selector: 'app-srlc',
  templateUrl: './srlc.component.html',
  styleUrls: ['./srlc.component.scss']
})
export class SrlcComponent implements OnInit, OnDestroy{
  private popstateSubscription?: Subscription;
  currentStep!: number;
  showAPILoader = false;
  loaderMessage!: string;
  invalid = false;

  isEffortsSelected: boolean = false;
  isPRSelected: boolean = false;
  selectedSRID: number = 0;
  currentDate: string = '';

  engeffortListCards: engEffortsList[] = [];
  filteredEngeffortListCards: engEffortsList[] = [];
  servicePrerequisites: svcPrerequisites[] = [];
  schCallCards: callsList[] = [];

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private loginService: LoginService,
    private commonService : CommonService,
    private serviceCalendarService: ServiceCalendarService,
    ) {
      const navigation = this.router.getCurrentNavigation();
      if(navigation?.extras.state){
        this.selectedSRID = navigation.extras.state['id'];
        this.currentDate = navigation.extras.state['date']
      }
    }

    ngOnInit(): void {
      this.popstateSubscription = this.commonService.handleNavigationEvents(this.router.events, () => {
        this.onBackClickHandle();
      });
      this.loaderMessage = "";
      this.loaderService.loaderState.subscribe(res => {
        this.showAPILoader = res;
      });
      this.loaderService.hideLoader();
      this.engEffortsList();
      this.getServicePrereq();
      this.scheduledCallsDetails();
      this.onStepperClick(0);
    }

    ngOnDestroy(): void {
      this.popstateSubscription?.unsubscribe();
    }

    engEffortsList() {
      this.loaderService.showLoader();
      this.serviceCalendarService.getEngEfforts(this.loginService.employeeId as number, this.selectedSRID).subscribe((data: any) => {
        this.engeffortListCards = data;
        this.filteredEngeffortListCards = data.filter(
          (item: any) => item.empId === this.loginService.employeeId
        );
        this.loaderService.hideLoader();
      },
      error => {
        this.loaderService.hideLoader();
      });
    }

    scheduledCallsDetails() {
      this.loaderService.showLoader();
      this.serviceCalendarService.getScheduledCalls(this.loginService.employeeId as number, this.serviceCalendarService.selectedDate).subscribe((data: any) => {
        this.schCallCards = data.filter(
          (item: any) => item.srid === this.selectedSRID
        );
        this.loaderService.hideLoader();
      },
      error => {
        this.loaderService.hideLoader();;
      });
    }

    onStepperClick(currentStep: number){
      this.isEffortsSelected = false;
      this.isPRSelected = false;
      this.currentStep = currentStep;
  
      if(currentStep == 0){
        this.isEffortsSelected = true;
      }
      else if(currentStep == 1){
        this.isPRSelected = true;
      }
    }

    getServicePrereq(){
      this.serviceCalendarService.getServicePrerequisites(this.selectedSRID,this.loginService.employeeId as number).
      subscribe((data: any) => {
        this.servicePrerequisites = data;
        this.serviceCalendarService.csrComments = data[0].serviceComments;
      });
    }

    onBackClickHandle() {
        this.serviceCalendarService.resetValues();
        this.router.navigate([AppRoutePaths.ServiceCalendar]);
    }
  
    onRefresh(){
      this.serviceCalendarService.resetValues();
      this.ngOnInit();
    }
}