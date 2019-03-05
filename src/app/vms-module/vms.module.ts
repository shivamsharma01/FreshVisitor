import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';

import { VMSRoutingModule } from './vms-routing.module';

import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { ManageRequestComponent } from './employee/employee-dashboard/manage-request/manage-request.component';
import { CreateRequestComponent } from './employee/employee-dashboard/create-request/create-request.component';
import { ErrorComponentComponent } from './employee/employee-dashboard/error-component/error-component.component';
import { FormControlComponent } from './employee/employee-dashboard/form-control/form-control.component';

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
    EmployeeComponent,
    EmployeeDashboardComponent,
    ManageRequestComponent,
    CreateRequestComponent,
    FormControlComponent,
    ErrorComponentComponent,
  ],
  providers: [],
})
export class VMSModule { }
