import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './pages/events/events.component';
import {EventRoutingModule} from "./event-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EventsComponent
  ],
    imports: [
        CommonModule,
        EventRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class EventModule { }
