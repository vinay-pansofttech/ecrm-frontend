import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardWrapperComponent } from './components/dashboard-wrapper/dashboard-wrapper.component';
import { AppRoutePaths } from 'src/app/core/Constants';

const routes: Routes = [
  {
    path: '',
    component: DashboardWrapperComponent,
  },
  //   {
  //     path: AppRoutePaths.ResetPassword,
  //     component: LoginComponent,
  //   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
  static components = [];
}
