import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { VisitorTypeGuard } from "./guard/visitor-type.guard";

import { EmployeeComponent } from "./employee/employee.component";
import { EmployeeDashboardComponent } from "./employee/employee-dashboard/employee-dashboard.component";
import { FamilyRequestComponent } from "./employee/family/family.component";
import { ManageRequestComponent } from "./employee/manage-request/manage-request.component";
import { IntervieweeRequestComponent } from "./employee/interviewee/interviewee.component";

const visitorRoutes: Routes = [
  {
    path: "employee",
    component: EmployeeComponent,
    children: [
      {
        path: "employee-dashboard",
        component: EmployeeDashboardComponent
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