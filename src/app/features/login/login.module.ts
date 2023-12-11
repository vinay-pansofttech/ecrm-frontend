import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KendoModule } from 'src/app/kendo.module';
import { LoginRoutingModule } from './login-routing.module';
import { EmailLoginComponent } from './components/email-login/email-login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginService } from './components/login/login.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [LoginComponent, EmailLoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KendoModule,
    LoginRoutingModule,
  ],
  exports: [LoginComponent, EmailLoginComponent, ForgotPasswordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [LoginService],
})
export class LoginModule {}
