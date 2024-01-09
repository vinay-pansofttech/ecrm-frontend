import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { EnquiryDetailsComponent } from './components/enquiry-details/enquiry-details.component';
import { KendoModule } from 'src/app/kendo.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { EnquiryDetailsFormsComponent } from './components/enquiry-details-forms/enquiry-details-forms.component';
import { EnquiryDescriptionComponent } from './components/enquiry-description/enquiry-description.component';
import { enquirydetailsRoutingModule } from './enquiry-routing.module';
import { EnquiryUpdateComponent } from './components/enquiry-update/enquiry-update.component';
import { EnquiryDetailsListViewComponent } from './components/enquiry-details-list-view/enquiry-details-list-view.component';
import { EnquiryDetailsHistoryComponent } from './components/enquiry-details-history/enquiry-details-history.component';

@NgModule({
  declarations: [
    EnquiryDetailsComponent,
    ContactDetailsComponent,
    EnquiryDetailsFormsComponent,
    EnquiryDescriptionComponent,
    EnquiryUpdateComponent,
    EnquiryDetailsListViewComponent,
    EnquiryDetailsHistoryComponent,
  ],
  imports: [
    CommonModule,
    KendoModule,
    LayoutModule,
    enquirydetailsRoutingModule,
    enquirydetailsRoutingModule,
  ],
  exports: [
    EnquiryDetailsComponent,
    ContactDetailsComponent,
    EnquiryDetailsListViewComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnquiryDetailsModule {}
