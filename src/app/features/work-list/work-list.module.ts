import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkListCardListComponent } from './components/work-list-card-list/work-list-card-list.component';
import { KendoModule } from 'src/app/kendo.module';
import { LayoutModule } from "@progress/kendo-angular-layout";
import { TextBoxModule } from '@progress/kendo-angular-inputs';
import { WorklistRoutingModule } from './work-list-routing.module';


@NgModule({
  declarations: [WorkListCardListComponent
    
    
  ],
  imports: [
    CommonModule,
    LayoutModule,
    KendoModule,
    TextBoxModule,
    WorklistRoutingModule   
    

  ],
  exports:[WorkListCardListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorkListModule { }
