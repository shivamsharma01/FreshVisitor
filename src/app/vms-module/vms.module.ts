import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { VMSRoutingModule } from './vms-routing.module';

import { VMSComponent } from './vms/vms.component';
import { ContainerComponent } from './common/container/container.component';
import { EmployeeComponent } from './vms/employee/employee.component';
import { ManageRequestComponent } from './vms/employee/manage-request/manage-request.component';
import { CreateRequestComponent } from './vms/employee/create-request/create-request.component';

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
    ManageRequestComponent,
    CreateRequestComponent,
  ],
  providers: [],
})
export class VMSModule { }
