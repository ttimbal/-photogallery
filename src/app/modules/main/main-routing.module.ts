import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'events',
    loadChildren: () => import('../event/event.module').then(m => m.EventModule)
  },
  {
    path:'photos',
    loadChildren: () => import('../photo/photo.module').then(m => m.PhotoModule)
  },
  {
    path:'cart',
    loadChildren: () => import('../cart/cart.module').then(m => m.CartModule)
  },
  {
    path:'user',
    loadChildren: () => import('../user/user.module').then(m => m.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
