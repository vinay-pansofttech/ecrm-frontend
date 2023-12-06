import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KendoModule } from 'src/app/kendo.module';
import { LoginRoutingModule } from './login-routing.module';
import { EmailLoginComponent } from './components/email-login/email-login.component';

@NgModule({
  declarations: [LoginComponent,EmailLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KendoModule,
    LoginRoutingModule,
  ],
  exports: [LoginComponent,EmailLoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class LoginModule {}
