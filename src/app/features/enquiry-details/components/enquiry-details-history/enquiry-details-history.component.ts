import { Component, OnInit } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { EnquiryDetailsService, EnquiryDetailsHistory } from '../../enquiry-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/features/common/common.service';

@Component({
  selector: 'app-enquiry-details-history',
  templateUrl: './enquiry-details-history.component.html',
  styleUrls: ['./enquiry-details-history.component.scss'],
})
export class EnquiryDetailsHistoryComponent implements OnInit {
  contactCards: EnquiryDetailsHistory[] = [];
  pageSize = 3;
  filteredCards: any[] = [];
  skip = 0;
  total = 0;
  searchTerm = '';
  id!: string | null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enquiryDetailService: EnquiryDetailsService,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.enquiryDetailsHistory();
  }

  enquiryDetailsHistory() {
    this.enquiryDetailService
      .getEnquiryDetailsHistory(this.id as string)
      .subscribe((data: any) => {
        this.contactCards = data;
        this.filterData();
      });
  }

  filterData(): void {
    this.filteredCards = [...this.contactCards];
    if (this.searchTerm.trim() !== '') {
      this.filteredCards = this.contactCards.filter(
        a =>
          (a.updDate &&
            a.updDate.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
          (a.modeOfContact &&
            a.modeOfContact
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())) ||
          (a.updatedBy &&
            a.updatedBy.toLowerCase().includes(this.searchTerm.toLowerCase()))
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

  onBackClick() {
    window.history.back();
  }

  onReset(){
    this.ngOnInit();
  }
}
