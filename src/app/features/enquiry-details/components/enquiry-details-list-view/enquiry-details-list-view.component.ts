import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { EnquiryDetailsService } from '../../enquiry-details.service';
import { ActivatedRoute, Router } from '@angular/router';
interface EnquiryList {
  id: string | number;
  dealNo: string;
  enqID: number;
  soldToLEID: number;
  soldToLE: string;
  enqStatusId: number;
  enqStatus: string;
  salesExecutiveID: number;
  salesExecutive: string;
  soldToContact: string;
  wsApprovalPendingWith: string;
  soldToContPhoneNo: number;
}

@Component({
  selector: 'app-enquiry-details-list-view',
  templateUrl: './enquiry-details-list-view.component.html',
  styleUrls: ['./enquiry-details-list-view.component.scss'],
})
export class EnquiryDetailsListViewComponent implements OnInit {
  contactCards: EnquiryList[] = [];
  pageSize = 3;
  filteredCards: any[] = [];
  skip = 0;
  total = 0;
  searchTerm = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enquiryDetailService: EnquiryDetailsService
  ) {}

  ngOnInit() {
    this.enquiryList();
  }

  enquiryList() {
    this.enquiryDetailService.getEnquirylist().subscribe((data: any) => {
      this.contactCards = data;
      this.filterData();
    });
  }

  filterData(): void {
    this.filteredCards = [...this.contactCards];
    if (this.searchTerm.trim() !== '') {
      this.filteredCards = this.contactCards.filter(
        a =>
          (a.dealNo &&
            a.dealNo.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
          (a.soldToContact &&
            a.soldToContact
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())) ||
          (a.soldToLE &&
            a.soldToLE.toLowerCase().includes(this.searchTerm.toLowerCase()))
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

  navigateById(id: string | number) {
    // this.router.navigate(['/enquiry-update', getRandomInt(10000)]);
    this.router.navigate(['/enquiry-update', id]);
  }
}
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
