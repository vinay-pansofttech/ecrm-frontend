import { Component, OnInit } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { EnquiryDetailsService } from '../../enquiry-details.service';
import { ActivatedRoute, Router } from '@angular/router';
interface EnquiryDetailsHistory {
  remarksID: number,
  remarks: string,
  leadLogGUID: number,
  leadLogDocName: string,
  leadLogSrcType: string,
  leadLogDocPath: string,
  updDate: string,
  createdByID: number,
  updatedBy: string,
  isMultiple: number,
  modeOfContactId: number,
  modeOfContact: string
}
@Component({
  selector: 'app-enquiry-details-history',
  templateUrl: './enquiry-details-history.component.html',
  styleUrls: ['./enquiry-details-history.component.scss']
})
export class EnquiryDetailsHistoryComponent implements OnInit{
  contactCards:EnquiryDetailsHistory[] = [];
  pageSize = 3; 
  filteredCards: any[] = [];
  skip = 0;
  total = 0;
  searchTerm = '';
  constructor( private route: ActivatedRoute,private router: Router,private enquiryDetailService: EnquiryDetailsService) {}

  ngOnInit() {
    this.enquiryDetailsHistory();
  }

  enquiryDetailsHistory(){
    this.enquiryDetailService.getEnquiryDetailsHistory().subscribe((data: any) => {
      this.contactCards = data;
      this.filterData();
    });
  }


  
  
  filterData(): void {
    this.filteredCards = [...this.contactCards];
    if (this.searchTerm.trim() !== '') {
      this.filteredCards = this.contactCards.filter(a =>
        (a.updDate && a.updDate.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      ( a. modeOfContact&& a. modeOfContact.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (a.updatedBy && a.updatedBy.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } 
    this.total = this.filteredCards.length;
    this.applyPagination();
  }

  applyPagination(): void {
    const state: State = {
      skip: this.skip,
      take: this.pageSize
    };
    const processed = process(this.filteredCards, state);
    this.filteredCards = processed.data;
    this.total = processed.total;
  }
  
  onPageChange(state: State): void {
    this.skip = state.skip as number
    this.filterData();
}

}


