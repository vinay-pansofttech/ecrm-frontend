import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardsComponent } from './components/dashboard-cards/dashboard-cards.component';
import { DashboardListComponent } from './components/dashboard-list/dashboard-list.component';
import { KendoModule } from 'src/app/kendo.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardCardsComponent,
    DashboardListComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    KendoModule
  ],
  exports: [
    DashboardCardsComponent,
    DashboardListComponent],

    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
