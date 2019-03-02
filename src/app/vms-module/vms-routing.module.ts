import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";

import { VMSComponent } from "./vms/vms.component";
import { BasicDetailsComponent } from "./vms/basic-details/basic-details.component";
import { EmployeeComponent } from "./vms/employee/employee.component";
import { VisitorComponent } from "./vms/visitor/visitor.component";
import { VisitorGuard } from "./common/guard/visitor.guard";

const visitorRoutes: Routes = [
  {
    path: "",
    component: VMSComponent,
    children: [
      {
        path: "",
        component: BasicDetailsComponent
      },
      {
        path: "employee",
        component: EmployeeComponent,
        canLoad: [VisitorGuard]
      },
      {
        path: "visitor",
        component: VisitorComponent,
        canLoad: [VisitorGuard]
      }
    ]
  },
  { path: "", redirectTo: "" },
  { path: "**", component: VMSComponent }
];

@NgModule({
  imports: [RouterModule.forChild(visitorRoutes)]
})
export class VMSRoutingModule {}
