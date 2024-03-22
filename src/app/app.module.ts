import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './features/login/login.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { WorkListModule } from './features/work-list/work-list.module';
import { KendoModule } from './kendo.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { EnquiryDetailsModule } from './features/enquiry-details/enquiry-details.module';
import { ServiceCalendarModule } from './features/service-calendar/service-calendar.module';
import { HttpClientModule } from '@angular/common/http';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { LoginService } from './features/login/components/login/login.service';
import { NotificationService } from './core/services/notification.service';
import { LoaderService } from './core/services/loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';
import { IconsModule } from '@progress/kendo-angular-icons';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    DashboardModule,
    KendoModule,
    HttpClientModule,
    IndicatorsModule,
    NotificationModule,
    WorkListModule,
    LayoutModule,
    EnquiryDetailsModule,
    ServiceCalendarModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    IconsModule,
  ],
  providers: [
    LoginService,
    NotificationService,
    LoaderService,
    AuthGuard,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
