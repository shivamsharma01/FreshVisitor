import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';

import { VMSRoutingModule } from './vms-routing.module';

import { VMSComponent } from './vms/vms.component';
import { EmployeeComponent } from './vms/employee/employee.component';
import { ManageRequestComponent } from './vms/employee/manage-request/manage-request.component';
import { CreateRequestComponent } from './vms/employee/create-request/create-request.component';
import { ErrorComponentComponent } from './vms/employee/error-component/error-component.component';
import { FormControlComponent } from './vms/employee/form-control/form-control.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    NgxSpinnerModule,
    VMSRoutingModule
  ],
  declarations: [
    VMSComponent,
    EmployeeComponent,
    ManageRequestComponent,
    CreateRequestComponent,
    ErrorComponentComponent,
    FormControlComponent,
  ],
  providers: [],
})
export class VMSModule { }
