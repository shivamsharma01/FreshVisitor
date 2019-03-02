import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { VMSRoutingModule } from './vms-routing.module';

import { VMSComponent } from './vms/vms.component';
import { ContainerComponent } from './common/container/container.component';
import { BasicDetailsComponent } from './vms/basic-details/basic-details.component';
import { EmployeeComponent } from './vms/employee/employee.component';
import { VisitorComponent } from './vms/visitor/visitor.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    VMSRoutingModule,
  ],
  declarations: [
    VMSComponent,
    ContainerComponent,
    EmployeeComponent,
    VisitorComponent,
    BasicDetailsComponent
  ],
  providers: [],
})
export class VMSModule { }
