import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {EventModel} from "../../../../core/models/event/event.model";
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events$:Observable<EventModel> = of();

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.events$= this.homeService.getPublicEvents();
  }


}
