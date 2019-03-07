import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';

import { VMSRoutingModule } from './vms-routing.module';

import { VMSComponent } from './vms/vms.component';
import { DashboardComponent } from './vms/dashboard/dashboard.component';
import { ManageRequestComponent } from './vms/manage-request/manage-request.component';
import { FormControlComponent } from './vms/common/form-control/form-control.component';
import { ErrorComponentComponent } from './vms/common/error-component/error-component.component';
import { FamilyRequestComponent } from './vms/family/family.component';
import { IntervieweeRequestComponent } from './vms/interviewee/interviewee.component';
import { BulkRequestComponent } from './vms/bulk-request/bulk-request.component';
import { SubmitFormComponent } from './vms/bulk-request/submit-form/submit-form.component';

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
    DashboardComponent,
    ManageRequestComponent,
    FormControlComponent,
    ErrorComponentComponent,
    FamilyRequestComponent,
    IntervieweeRequestComponent,
    BulkRequestComponent,
    SubmitFormComponent
  ],
  providers: [],
})
export class VMSModule { }
