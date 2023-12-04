import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { KendoModule } from 'src/app/kendo.module';

@NgModule({
  declarations: [LoginComponent,],
  imports: [CommonModule,FormsModule, ReactiveFormsModule, KendoModule],
  exports: [LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
