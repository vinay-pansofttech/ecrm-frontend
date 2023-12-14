import { Component ,ViewChild } from '@angular/core';
;
import {PageChangeEvent,PagerNumericButtonsComponent,} from "@progress/kendo-angular-pager";

@Component({
  selector: 'app-enquiry-details-list-view',
  templateUrl: './enquiry-details-list-view.component.html',
  styleUrls: ['./enquiry-details-list-view.component.scss']
})
export class EnquiryDetailsListViewComponent {
  
  searchTerm = '';

  filteredCards() {
    return this.contactcards.filter(a =>
      a.number.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.solddetails.toLowerCase().includes(this.searchTerm.toLowerCase())||
      a.soldsite.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  

   @ViewChild("pager", { static: false })
  pager!: PagerNumericButtonsComponent;
  public skip = 0;
  public pageSize = 1;

  public onPageChange(e: PageChangeEvent): void {
    this.skip = e.skip;
    this.pageSize = e.take;
    // this.pager.pageChooserLabel;
  }


  contactcards=[
    {
      id : 1 ,
      number : '#3D09A',
      solddetails : ' Ravichandran Venugopal',
      soldsite: 'ENOC Processing Company LLC- Dubai'
  
    },
    {
      id : 2 ,
      number : '#3D09B',
      solddetails : ' Ravichandran Venugopal',
      soldsite: 'ENOC Processing Company LLC- Dubai'
    },
    {
      id : 3 ,
      number : '#3D09C',
      solddetails : ' Ravichandran Venugopal',
      soldsite: 'ENOC Processing Company LLC- Dubai'
    },
    
  ]

}
