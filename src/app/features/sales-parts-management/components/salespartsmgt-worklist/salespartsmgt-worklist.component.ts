import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SalesPartsManagementService, SPMWorklistItem} from '../../sales-parts-management.service';
import { LoginService } from 'src/app/features/login/components/login/login.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { process, State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-salespartsmgt-worklist',
  templateUrl: './salespartsmgt-worklist.component.html',
  styleUrls: ['./salespartsmgt-worklist.component.scss']
})
export class SalespartsmgtWorklistComponent {
  public showSPMAPILoader = false;
  contactCards: SPMWorklistItem[] = [];
  pageSize = 3;
  filteredCards: SPMWorklistItem[] = [];
  skip = 0;
  total = 0;
  searchTerm = '';

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private loginService: LoginService,
    private spmService: SalesPartsManagementService
  ){}

  ngOnInit() {
    this.loaderService.loaderState.subscribe(res => {
      this.showSPMAPILoader = res;
    });
    this.loaderService.hideLoader();
    this.getSPMWorklist();
  }

  getSPMWorklist() {
    this.loaderService.showLoader();
    this.spmService.getSPMWorkList(this.loginService.employeeId as number).subscribe((data: any) => {
      this.contactCards = data;
      this.contactCards = this.contactCards.filter(
        a => (a.validatePriceCnt >= 1)
      );
      this.filterData();
      this.loaderService.hideLoader();
    },
    error => {
      this.loaderService.hideLoader();
    });
  }

  filterData(): void {
    this.filteredCards = [...this.contactCards];
    if (this.searchTerm.trim() !== '') {
      this.filteredCards = this.contactCards.filter(
        a =>
          (a.leadNo &&
            a.leadNo.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
          (a.customer &&
            a.customer.toLowerCase().includes(this.searchTerm.toLowerCase())) 
      );
    }
    this.total = this.filteredCards.length;
    this.applyPagination();
  }

  applyPagination(): void {
    const state: State = {
      skip: this.skip,
      take: this.pageSize,
    };
    const processed = process(this.filteredCards, state);
    this.filteredCards = processed.data;
    this.total = processed.total;
  }

  onPageChange(state: State): void {
    this.skip = state.skip as number;
    this.filterData();
  }

  navigateById(enqId: number) {
    this.spmService.getSPMSupplierList(this.loginService.employeeId as number,enqId).subscribe((data: any) => {
      if(data.length > 0)
        this.router.navigate(['sales-parts-management-supplist',enqId]);
      else
        this.router.navigate(['sales-parts-management-approval',enqId,0]);
    });
  }

  onReset(){
    this.ngOnInit();
  }

  onBackClickHandle(){
    this.router.navigate(['dashboard']);
  }
}
