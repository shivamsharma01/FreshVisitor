import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { EmployeeGuard } from "./guard/employee.guard";
import { AdminGuard } from "./guard/admin.guard";

import { VMSComponent } from "./vms/vms.component";
import { DashboardComponent } from "./vms/dashboard/dashboard.component";
import { IndividualRequestComponent } from "./vms/individual-request//individual-request.component";
import { ManageRequestComponent } from "./vms/manage-request/manage-request.component";
import { BulkRequestComponent } from "./vms/bulk-request/bulk-request.component";

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
        path: "individual-request/:visitor-type",
        component: IndividualRequestComponent,
        canActivate: [EmployeeGuard]
      },
      {
        path: "bulk-request",
        component: BulkRequestComponent, 
        canActivate: [EmployeeGuard, AdminGuard]
      },
      {
        path: "manage",
        component: ManageRequestComponent,
        canActivate: [EmployeeGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(visitorRoutes)]
})
export class VMSRoutingModule { }