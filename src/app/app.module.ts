import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { DashboardCardsComponent } from './features/dashboard/components/dashboard-cards/dashboard-cards.component';
import { DashboardListComponent } from './features/dashboard/components/dashboard-list/dashboard-list.component';
import { LoginModule } from './features/login/login.module';
import { DashboardModule } from './features/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardCardsComponent,
    DashboardListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, LoginModule, DashboardModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
