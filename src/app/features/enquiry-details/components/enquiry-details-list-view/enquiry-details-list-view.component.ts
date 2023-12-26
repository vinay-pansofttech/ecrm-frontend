import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { EnquiryDetailsService } from '../../enquiry-details.service';
import { ActivatedRoute, Router } from '@angular/router';
interface EnquiryList {
id: string|number;
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
}

@Component({
  selector: 'app-enquiry-details-list-view',
  templateUrl: './enquiry-details-list-view.component.html',
  styleUrls: ['./enquiry-details-list-view.component.scss'],
})
export class EnquiryDetailsListViewComponent implements OnInit {
  contactCards: EnquiryList[] = [];
  pageSize = 3; 
  skip =0;
  constructor( private route: ActivatedRoute,private router: Router,private enquiryDetailService: EnquiryDetailsService) {}

  ngOnInit() {
    this.enquiryDetailService.getEnquirylist().subscribe((data: any) => {
      console.log(data);
      this.contactCards = data;
    });
  }
  searchTerm = '';

  filteredCards() {
    return this.contactCards.filter(
      a =>
        a?.dealNo?.toLowerCase().includes(this.searchTerm?.toLowerCase()) ||
        a?.soldToContact
          ?.toLowerCase()
          .includes(this.searchTerm?.toLowerCase()) ||
        a?.soldToLE?.toLowerCase().includes(this.searchTerm?.toLowerCase())
    );
  }

  navigateById(id: string | number) {
    this.router.navigate(['/enquiry-update', `${id}`]);
  }

  onPageChange(state: State): void {
    if (state && state.skip !== undefined) {
      this.skip = state.skip;
    }
  }

  getPaginatedCards(): any[] {
    return process(this.contactCards, { skip: this.skip, take: this.pageSize }).data;
  }
}
