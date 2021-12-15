import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./modules/main/pages/main/main.component";
import { AuthComponent } from './modules/auth/pages/auth/auth.component';
import {UserGuard} from "./core/guards/user.guard";

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canActivate:[UserGuard]
  },
  {
    path:'auth',
    component:AuthComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

