import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { VisitorTypeGuard } from "./guard/visitor-type.guard";

import { VMSComponent } from "./vms/vms.component";
import { DashboardComponent } from "./vms/dashboard/dashboard.component";
import { FamilyRequestComponent } from "./vms/family/family.component";
import { ManageRequestComponent } from "./vms/manage-request/manage-request.component";
import { IntervieweeRequestComponent } from "./vms/interviewee/interviewee.component";
import { BulkRequestComponent } from "./vms/bulk-request/bulk-request.component";
import { SubmitFormComponent } from "./vms/bulk-request/submit-form/submit-form.component";

const visitorRoutes: Routes = [
  {
    path: "",
    component: VMSComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "family",
        component: FamilyRequestComponent,
        canActivate: [VisitorTypeGuard]
      },
      {
        path: "interviewee",
        component: IntervieweeRequestComponent,
        canActivate: [VisitorTypeGuard]
      },
      {
        path: "bulk-request",
        component: BulkRequestComponent
      },
      {
        path: "manage",
        component: ManageRequestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(visitorRoutes)]
})
export class VMSRoutingModule { }