import { NgModule } from '@angular/core';

// Import all Kendo UI components here
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';

@NgModule({
  imports: [
    ButtonsModule,
    GridModule,
    DatePickerModule,
    // Add more Kendo UI modules here
  ],
  exports: [
    ButtonsModule,
    GridModule,
    DatePickerModule,
    // Export all Kendo UI modules here
  ],
})
export class KendoModule {}
