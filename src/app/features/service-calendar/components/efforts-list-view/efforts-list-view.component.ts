import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCalendarService, engEffortsList } from '../../service-calendar.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CommonService } from 'src/app/features/common/common.service';
import { DatePipe } from '@angular/common';

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

  // engEffortsList() {
  //   this.loaderService.showLoader();
  //   this.serviceCalendarService.getEngEfforts(this.loginService.employeeId as number, this.srid).subscribe((data: any) => {
  //     this.engeffortListCards = data.filter(
  //       (item: any) => item.empId === this.loginService.employeeId
  //     );
  //     this.loaderService.hideLoader();
  //   },
  //   error => {
  //     this.loaderService.hideLoader();
  //   });
  // }

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
    this.router.navigate(['/service-efforts', cardIndex, this.srid, this.currentDate]);
  }

  onBackClickHandle() {
    this.serviceCalendarService.resetValues();
    this.router.navigate(['/service-calendar']);
  }

  onRefresh(){
    this.ngOnInit();
  }

  generateCSR(){
    const formValue = this.csrGenerateForm.value;
    this.serviceCalendarService.csrComments = formValue.csrComments? formValue.csrComments: "";
    this.router.navigate(['/csr-generator']);
  }

}
