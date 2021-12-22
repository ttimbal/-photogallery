import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import {PhotoRoutingModule} from "./photo-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { YourPhotosComponent } from './pages/your-photos/your-photos.component';
import { YourEventsComponent } from './pages/your-events/your-events.component';
import { EventPhotosComponent } from './pages/your-events/event-photos/event-photos.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DetailsComponent } from './pages/details/details.component';



@NgModule({
  declarations: [
    MainComponent,
    YourPhotosComponent,
    YourEventsComponent,
    EventPhotosComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PhotoModule { }
