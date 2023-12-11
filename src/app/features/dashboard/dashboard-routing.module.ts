import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutePaths } from 'src/app/core/Constants';
import { EnquiryDetailsComponent } from '../enquiry-details/enquiry-details/enquiry-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
   {
     path: AppRoutePaths.Dashboard,
      component: DashboardComponent,
   },
   {
    path:'enquiry-details',
    component:EnquiryDetailsComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
  static components = [];
}
