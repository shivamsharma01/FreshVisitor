import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { VisitorRoutingModule } from './visitor-routing.module';

import { ContainerComponent } from './common/container/container.component';
import { VisitorFormComponent } from './visitor-form/visitor-form.component';


@NgModule({
  declarations: [
    ContainerComponent,
    VisitorFormComponent
  ],
  imports: [
    VisitorRoutingModule
  ],
  providers: [],
})
export class VisitorModule { }
