import { Component, OnInit } from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PhotoService} from "../../services/photo.service";
import {EventModel} from "../../../../core/models/event/event.model";

@Component({
  selector: 'app-your-events',
  templateUrl: './your-events.component.html',
  styleUrls: ['./your-events.component.css']
})
export class YourEventsComponent implements OnInit {

  selected:number= 0;
  eventId:number=0;
  listObservers$:Subscription[]=[];
  //events$:Observable<EventModel> = of();
  events!:EventModel;
  nameEvents:string[]=[];


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private photoService: PhotoService) {}

  ngOnInit(): void {
    this.activatedRoute.firstChild?.params.subscribe(params => {
      this.eventId=Number(params.id);
    });
    this.photoService.myEvents().subscribe(
      res=>{
        this.events=res;
        this.events.data.forEach((event,index)=>{
          this.nameEvents.push(event.attributes.name);
          if(this.eventId===0&&index===0) this.router.navigate([event.id], {relativeTo: this.activatedRoute});
          if(this.eventId===event.id) this.selected = index;
        })
      },
        err=>console.log(err)
    )
  }

  ngOnDestroy() :void {
    this.listObservers$.forEach(u=>u.unsubscribe());
  }

  selectedEvent($index: number) {
    const event=this.events.data[$index];
    console.log(event);
    this.router.navigate([event.id], {relativeTo: this.activatedRoute});
  }
}
