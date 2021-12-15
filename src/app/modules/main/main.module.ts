import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main/main.component';
import {SharedModule} from "../../shared/shared.module";
import {CookieService} from "ngx-cookie-service";
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  providers:
    [CookieService],
})
export class MainModule { }
