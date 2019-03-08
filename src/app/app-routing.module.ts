import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";

import { LoginComponent } from "./login/login.component";
import { ErrorPageComponent } from "./error-page/error-page.component";

const appRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "error",
    component: ErrorPageComponent
  },
  {
    path: "vms",
    loadChildren: "./vms-module/vms.module#VMSModule",
  //  canLoad: [AuthGuard]
  },
  { path: "", redirectTo: "vms/dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "error" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
