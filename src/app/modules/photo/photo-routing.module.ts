import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {YourPhotosComponent} from "./pages/your-photos/your-photos.component";
import {YourEventsComponent} from "./pages/your-events/your-events.component";
import {EventPhotosComponent} from "./pages/your-events/event-photos/event-photos.component";
import {DetailsComponent} from "./pages/details/details.component";

const routes: Routes = [
  {
    path: 'public-event/:id',
    component:EventPhotosComponent,
  },
  {
    path:'details/:id',
    component:DetailsComponent,
  },
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path: 'your-photos',
        component:YourPhotosComponent,
      },
      {
        path: 'your-events',
        component:YourEventsComponent,
        children:[
          {
            path: ':id',
            component:EventPhotosComponent
          }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotoRoutingModule { }
