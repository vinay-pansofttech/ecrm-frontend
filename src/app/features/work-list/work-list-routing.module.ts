import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutePaths } from 'src/app/core/Constants';
import { WorkListCardListComponent } from './components/work-list-card-list/work-list-card-list.component';

const routes: Routes = [
{
     path:'',
     component:WorkListCardListComponent
},
    {
        path: AppRoutePaths.WorkList,
        component: WorkListCardListComponent,
   },
  
   
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorklistRoutingModule {
  static components = [];
}
