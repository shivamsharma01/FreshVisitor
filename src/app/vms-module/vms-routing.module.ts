import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";

import { VMSComponent } from "./vms/vms.component";
import { EmployeeComponent } from "./vms/employee/employee.component";
import { CreateRequestComponent } from "./vms/employee/create-request/create-request.component";
import { ManageRequestComponent } from "./vms/employee/manage-request/manage-request.component";

const visitorRoutes: Routes = [
  {
    path: "",
    component: VMSComponent,
    children: [
      {
        path: "employee",
        component: EmployeeComponent, children: [
          {
            path: "create",
            component: CreateRequestComponent
          },
          {
            path: "manage",
            component: ManageRequestComponent
          }
        ]
      },
    ]
  },
  { path: "", redirectTo: "" },
  { path: "**", component: VMSComponent }
];

@NgModule({
  imports: [RouterModule.forChild(visitorRoutes)]
})
export class VMSRoutingModule { }
