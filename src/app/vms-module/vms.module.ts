import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import { VMSRoutingModule } from './vms-routing.module';

import { VMSComponent } from './vms/vms.component';
import { EmployeeComponent } from './vms/employee/employee.component';
import { ManageRequestComponent } from './vms/employee/manage-request/manage-request.component';
import { CreateRequestComponent } from './vms/employee/create-request/create-request.component';
import { ErrorComponentComponent } from './vms/employee/error-component/error-component.component';
import { FormControlComponentComponent } from './vms/employee/form-control-component/form-control-component.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    VMSRoutingModule,
    MyDatePickerModule
  ],
  declarations: [
    VMSComponent,
    EmployeeComponent,
    ManageRequestComponent,
    CreateRequestComponent,
    ErrorComponentComponent,
    FormControlComponentComponent,
  ],
  providers: [],
})
export class VMSModule { }
