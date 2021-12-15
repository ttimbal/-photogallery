import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from "@angular/router";
import {TabComponent} from "./components/tab/tab.component";
import { ModalComponent } from './components/modal/modal.component';
import { ImageControlDirective } from './directives/image-control.directive';



@NgModule({
    declarations: [
        HeaderComponent,
        TabComponent,
        ModalComponent,
        ImageControlDirective
    ],
    exports: [
        HeaderComponent,
        TabComponent,
        ModalComponent,
        ImageControlDirective
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
