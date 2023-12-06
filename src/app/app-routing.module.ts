import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutePaths } from './core/Constants';
import { LoginComponent } from './features/login/components/login/login.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutePaths.Empty,
  },
  {
    path: AppRoutePaths.Login,
    component: LoginComponent,
    loadChildren: () =>
      import('./features/login/login.module').then(m => m.LoginModule),
  },
  {
    path: AppRoutePaths.Dashboard,
    component: DashboardComponent,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
