import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AuthGuard} from "../../core/guards/auth.guard";


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'logout',
    redirectTo:'/auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
