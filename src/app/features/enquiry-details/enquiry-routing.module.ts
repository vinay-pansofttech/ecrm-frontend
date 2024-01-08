import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutePaths } from 'src/app/core/Constants';
import { EnquiryDetailsComponent } from './components/enquiry-details/enquiry-details.component';
import { EnquiryUpdateComponent } from './components/enquiry-update/enquiry-update.component';
import { EnquiryDetailsListViewComponent } from './components/enquiry-details-list-view/enquiry-details-list-view.component';
import { AuthGuard } from 'src/app/auth.guard';
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: EnquiryDetailsComponent,
  },
  {
    path: AppRoutePaths.EnquiryDetails,
    canActivate: [AuthGuard],
    component: EnquiryDetailsComponent,
  },
  { path: 'enquiry-update/:id', component: EnquiryUpdateComponent },
  {
    path: AppRoutePaths.EnquiryDetails,
    canActivate: [AuthGuard],
    component: EnquiryDetailsComponent,
  },
  {
    path: AppRoutePaths.EnquiryDetails,
    canActivate: [AuthGuard],
    component: EnquiryDetailsComponent,
  },
  {
    path: AppRoutePaths.EnquiryDetailsListView,
    canActivate: [AuthGuard],
    component: EnquiryDetailsListViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class enquirydetailsRoutingModule {
  static components = [];
}
