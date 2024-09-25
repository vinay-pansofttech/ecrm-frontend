import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KendoModule } from 'src/app/kendo.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { NotificationColorsComponent } from './components/notification-colors/notification-colors.component';
import { TooltipsModule, PopoverModule } from "@progress/kendo-angular-tooltip";
import { CommonService } from './common.service';
import { AttachmentPopUpComponent } from './components/attachment-pop-up/attachment-pop-up.component';

@NgModule({
  declarations: [
    NotificationColorsComponent,
    AttachmentPopUpComponent
  ],
  exports: [
    NotificationColorsComponent, 
    AttachmentPopUpComponent
  ],
  imports: [
    CommonModule,
    KendoModule,
    LayoutModule,
    TooltipsModule,
    PopoverModule
  ],
  providers: [
    CommonService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class CommonFeaturesModule { }