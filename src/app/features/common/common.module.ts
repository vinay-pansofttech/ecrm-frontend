import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationColorsComponent } from './components/notification-colors/notification-colors.component';
import { TooltipsModule, PopoverModule } from "@progress/kendo-angular-tooltip";


@NgModule({
  declarations: [
    NotificationColorsComponent
  ],
  exports: [NotificationColorsComponent],
  imports: [
    CommonModule,
    TooltipsModule,
    PopoverModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class CommonFeaturesModule { }
