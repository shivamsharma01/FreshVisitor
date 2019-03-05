import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";

import { VisitorTypeGuard } from "./employee/employee-dashboard/guard/visitor-type.guard";

import { EmployeeComponent } from "./employee/employee.component";
import { EmployeeDashboardComponent } from "./employee/employee-dashboard/employee-dashboard.component";
import { CreateRequestComponent } from "./employee/employee-dashboard/create-request/create-request.component";
import { ManageRequestComponent } from "./employee/employee-dashboard/manage-request/manage-request.component";

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
        path: "create/:type",
        component: CreateRequestComponent,
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