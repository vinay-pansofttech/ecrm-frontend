import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutePaths } from 'src/app/core/Constants';
import { LoginComponent } from './components/login/login.component';
import { EmailLoginComponent } from './components/email-login/email-login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
    {
      path: AppRoutePaths.Email,
      component: EmailLoginComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
  static components = [];
}
