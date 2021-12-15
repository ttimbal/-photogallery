import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input() withBadges:boolean = false;
  @Input() options=['hola','test','test'];
  @Input() selected=0
  @Output() selectedEvent:EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  select(index:number) {
    this.selected=index
    this.selectedEvent.emit(this.selected);
  }
}
