import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutePaths } from 'src/app/core/Constants';
import { EnquiryDetailsComponent } from './enquiry-details/enquiry-details.component';
import { EnquiryUpdateComponent } from './enquiry-update/enquiry-update.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class enquirydetailsRoutingModule {
  static components = [];
}