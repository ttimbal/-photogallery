import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from "@angular/router";
import {TabComponent} from "./components/tab/tab.component";
import { ModalComponent } from './components/modal/modal.component';
import { PhotoComponent } from './components/photo/photo.component';



@NgModule({
    declarations: [
        HeaderComponent,
        TabComponent,
        ModalComponent,
        PhotoComponent
    ],
    exports: [
        HeaderComponent,
        TabComponent,
        ModalComponent,
        PhotoComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
