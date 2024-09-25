import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StepperComponent, SelectEvent  } from '@progress/kendo-angular-layout';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CommonService } from 'src/app/features/common/common.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { ServiceCalendarService, engEffortsList, svcPrerequisites } from '../../service-calendar.service';

@Component({
  selector: 'app-srlc',
  templateUrl: './srlc.component.html',
  styleUrls: ['./srlc.component.scss']
})
export class SrlcComponent {
  currentStep!: number;
  showAPILoader = false;
  loaderMessage!: string;
  invalid = false;

  isEffortsSelected: boolean = false;
  isPRSelected: boolean = false;
  selectedSRID: number = 0;
  currentDate: string = '';

  engeffortListCards: engEffortsList[] = [];
  servicePrerequisites: svcPrerequisites[] = [];

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private loginService: LoginService,
    private commonService : CommonService,
    private serviceCalendarService: ServiceCalendarService
    ) {}

    ngOnInit(): void {
      this.loaderMessage = "";
      this.loaderService.loaderState.subscribe(res => {
        this.showAPILoader = res;
      });
      this.loaderService.hideLoader();

      this.currentDate = this.route.snapshot.paramMap.get('Date')!;
      const enqIdString = this.route.snapshot.paramMap.get('id');
      if (enqIdString !== null) {
        const idNumber: number = parseInt(enqIdString, 10);
        this.selectedSRID = idNumber;   
      }
      this.engEffortsList();
      this.getServicePrereq();
      this.onStepperClick(0);
    }

    engEffortsList() {
      this.loaderService.showLoader();
      this.serviceCalendarService.getEngEfforts(this.loginService.employeeId as number, this.selectedSRID).subscribe((data: any) => {
        this.engeffortListCards = data.filter(
          (item: any) => item.empId === this.loginService.employeeId
        );
        this.loaderService.hideLoader();
      },
      error => {
        this.loaderService.hideLoader();
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
      });
    }

    onBackClickHandle() {
        this.serviceCalendarService.resetValues();
        this.router.navigate(['/service-calendar']);
    }
  
    onRefresh(){
      this.serviceCalendarService.resetValues();
      this.ngOnInit();
    }
}
