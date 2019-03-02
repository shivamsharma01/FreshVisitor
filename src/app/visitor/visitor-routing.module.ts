import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VisitorFormComponent } from './visitor-form/visitor-form.component';

const visitorRoutes: Routes = [
  {
    path: 'v1',
    component: VisitorFormComponent
  },
  { path: '',   redirectTo: 'v1', pathMatch: 'full' },
  { path: '**', component: VisitorFormComponent  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      visitorRoutes
    )
  ]
})
export class VisitorRoutingModule { }
