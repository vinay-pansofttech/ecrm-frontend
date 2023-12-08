import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutePaths } from 'src/app/core/Constants';
import { EnquiryDetailsComponent } from './enquiry-details/enquiry-details.component';
import { EnquiryUpdateComponent } from './enquiry-update/enquiry-update.component';
import { EnquiryDetailsListViewComponent } from './enquiry-details-list-view/enquiry-details-list-view.component';
const routes: Routes = [
  {
    path: '',
    component: EnquiryDetailsComponent,
  },
  {
      path:AppRoutePaths.EnquiryDetails,
      component:EnquiryDetailsComponent
  },
  {
    path:AppRoutePaths.EnquiryUpdate,
    component:EnquiryUpdateComponent
  }
{
    path:AppRoutePaths.EnquiryDetails,
    component:EnquiryDetailsComponent
},
  {
      path:AppRoutePaths.EnquiryDetailsListView,
      component: EnquiryDetailsListViewComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class enquirydetailsRoutingModule {
  static components = [];
}