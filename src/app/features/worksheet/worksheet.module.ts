import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KendoModule } from 'src/app/kendo.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { GridModule } from "@progress/kendo-angular-grid";
import { TooltipsModule } from "@progress/kendo-angular-tooltip";
import { LoginModule } from '../login/login.module';
import { PopoverModule } from "@progress/kendo-angular-tooltip";

import { WorksheetRoutingModule } from './worksheet-routing.module';
import { WorksheetDetailsComponent } from './components/worksheet-details/worksheet-details.component';
import { CreditExposureComponent } from './components/credit-exposure/credit-exposure.component';
import { PriceDetailsComponent } from './components/price-details/price-details.component';
import { WorksheetApprovalComponent } from './components/worksheet-approval/worksheet-approval.component';
import { DlcComponent } from './components/dlc/dlc.component';
import { MarginDetailsComponent } from './components/margin-details/margin-details.component';
import { DrqDetailsComponent } from './components/drq-details/drq-details.component';


@NgModule({
  declarations: [
    WorksheetDetailsComponent,
    CreditExposureComponent,
    PriceDetailsComponent,
    WorksheetApprovalComponent,
    DlcComponent,
    MarginDetailsComponent,
    DrqDetailsComponent
  ],
  imports: [
    CommonModule,
    KendoModule,
    LayoutModule,
    LoginModule,
    GridModule,
    TooltipsModule,
    PopoverModule,
    WorksheetRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorksheetModule { }
