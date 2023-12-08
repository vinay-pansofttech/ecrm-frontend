import { NgModule } from '@angular/core';
// Import all Kendo UI components here
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IconsModule } from '@progress/kendo-angular-icons';

import { UploadsModule } from '@progress/kendo-angular-upload';
import { PagerModule } from '@progress/kendo-angular-pager';

@NgModule({
  imports: [
    ButtonsModule,
    GridModule,
    DatePickerModule,
    ReactiveFormsModule,
    LayoutModule,
    InputsModule,
    TextBoxModule,
    DropDownsModule,
    PagerModule,
    InputsModule,
    LabelModule,
    IndicatorsModule,
    NotificationModule,
    FormsModule,
    UploadsModule,

    DropDownsModule,
    LabelModule,
    FormsModule,
    LayoutModule,
    InputsModule,
    TextBoxModule,
    IconsModule,
    DateInputsModule,

    // Add more Kendo UI modules here
  ],
  exports: [
    ButtonsModule,
    GridModule,
    DatePickerModule,
    LayoutModule,
    InputsModule,
    PagerModule,
    TextBoxModule,
    DropDownsModule,
    InputsModule,
    LabelModule,
    IndicatorsModule,
    NotificationModule,
    FormsModule,
    ReactiveFormsModule,
    UploadsModule,
    // Export all Kendo UI modules here
  ],
})
export class KendoModule {}
