import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';

import { VMSRoutingModule } from './vms-routing.module';

import { HighlightDirective } from './highlight.directive';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { ManageRequestComponent } from './employee/employee-dashboard/manage-request/manage-request.component';
import { FormControlComponent } from './employee/employee-dashboard/form-control/form-control.component';
import { ErrorComponentComponent } from './employee/employee-dashboard/error-component/error-component.component';
import { FamilyRequestComponent } from './employee/employee-dashboard/family/family.component';
import { IntervieweeRequestComponent } from './employee/employee-dashboard/interviewee/interviewee.component';

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
    HighlightDirective,
    EmployeeComponent,
    EmployeeDashboardComponent,
    ManageRequestComponent,
    FormControlComponent,
    ErrorComponentComponent,
    FamilyRequestComponent,
    IntervieweeRequestComponent
  ],
  providers: [],
})
export class VMSModule { }
