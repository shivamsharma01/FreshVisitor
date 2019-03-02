import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";

import { VMSComponent } from "./vms/vms.component";
import { BasicDetailsComponent } from "./vms/basic-details/basic-details.component";
import { EmployeeComponent } from "./vms/employee/employee.component";
import { VisitorComponent } from "./vms/visitor/visitor.component";
import { VisitorGuard } from "./common/guard/visitor.guard";
import { EmployeeGuard } from "./common/guard/employee.guard";
import { ManageComponent } from "./manage/manage.component";

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
        canLoad: [EmployeeGuard]
      },
      {
        path: "visitor",
        component: VisitorComponent,
        canLoad: [VisitorGuard]
      },
      {
        path: "manage",
        component: ManageComponent,
        canLoad: [EmployeeGuard]
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
