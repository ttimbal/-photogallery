import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SimpleEventService} from "../../../../shared/services/simple-event.service";

@Component({
  selector: 'app-photos',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit,OnDestroy {

  selected: number = 0;
  listObservers$:Subscription[]=[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private simpleEventService: SimpleEventService) {
  }

  ngOnInit(): void {
    const activatedRouteObserver$=this.activatedRoute.firstChild?.url.subscribe(
      res => {
        const path = res[0].path;
        if (path === 'your-main') this.selected = 0;
        if (path === 'your-events') this.selected = 1;
      }
    );
    if(activatedRouteObserver$!==undefined)
    this.listObservers$.push(activatedRouteObserver$);
  }

  ngOnDestroy() :void {
    this.listObservers$.forEach(u=>u.unsubscribe());
  }

  selectedEvent($index: number) {
    this.selected=$index;
    if ($index === 0) this.router.navigate(['your-main'], {relativeTo: this.activatedRoute});
    if ($index === 1) this.router.navigate(['your-events'], {relativeTo: this.activatedRoute});
  }

  create(){
    this.simpleEventService.createPhoto.emit(true);
  }
}
