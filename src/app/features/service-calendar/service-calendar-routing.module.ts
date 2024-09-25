import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SrlcComponent } from './components/srlc/srlc.component';
import { EffortsListViewComponent } from './components/efforts-list-view/efforts-list-view.component';
import { CsrGeneratorComponent } from './components/csr-generator/csr-generator.component';
import { ServiceEffortsComponent } from './components/service-efforts/service-efforts.component';
import { PartsRequestComponent } from './components/parts-request/parts-request.component';
import { AppRoutePaths } from 'src/app/core/Constants';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: AppRoutePaths.ServiceCalendar,
    component: CalendarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutePaths.SRLC,
    component: SrlcComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutePaths.ServiceEffortsList,
    component: EffortsListViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutePaths.ServiceCSRGenerator,
    component: CsrGeneratorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutePaths.ServiceEfforts,
    component: ServiceEffortsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutePaths.PartsRequest,
    component: PartsRequestComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ServiceCalendarRoutingModule { 
  static components = [];
}
