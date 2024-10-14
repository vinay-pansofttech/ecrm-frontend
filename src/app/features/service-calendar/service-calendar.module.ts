import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KendoModule } from 'src/app/kendo.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LoginModule } from '../login/login.module';
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { ServiceCalendarRoutingModule } from './service-calendar-routing.module';
import { ServiceEffortsComponent } from './components/service-efforts/service-efforts.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EffortsListViewComponent } from './components/efforts-list-view/efforts-list-view.component';
import { PDFViewerModule } from '@progress/kendo-angular-pdfviewer';
import { CsrGeneratorComponent } from './components/csr-generator/csr-generator.component';
import { PartsRequestComponent } from './components/parts-request/parts-request.component';
import { SrlcComponent } from './components/srlc/srlc.component';

@NgModule({
  declarations: [
    CalendarComponent,
    ServiceEffortsComponent,
    EffortsListViewComponent,
    CsrGeneratorComponent,
    PartsRequestComponent,
    SrlcComponent
  ],
  imports: [
    CommonModule,
    KendoModule,
    LayoutModule,
    LoginModule,
    DateInputsModule,
    PDFViewerModule,
    ServiceCalendarRoutingModule
  ],
  exports: [
    CalendarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ServiceCalendarModule { }
