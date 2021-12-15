import {EventEmitter, Injectable} from '@angular/core';
import {EventService} from "../../modules/event/services/event.service";

@Injectable({
  providedIn: 'root'
})
export class SimpleEventService {

  createPhoto:EventEmitter<boolean>=new EventEmitter<boolean>();
  constructor() { }
}
