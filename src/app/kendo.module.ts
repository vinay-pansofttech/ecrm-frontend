import { NgModule } from '@angular/core';

// Import all Kendo UI components here
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import {  ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from "@progress/kendo-angular-layout";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    ButtonsModule,
    GridModule,
    DatePickerModule, ReactiveFormsModule , LayoutModule,BrowserModule,BrowserAnimationsModule
    // Add more Kendo UI modules here
  ],
  exports: [
    ButtonsModule,
    GridModule,
    DatePickerModule,
    LayoutModule
    // Export all Kendo UI modules here
  ],
})
export class KendoModule {}
