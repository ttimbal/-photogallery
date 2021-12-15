import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {EventModel} from "../../../core/models/event/event.model";
import {map} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UploadService} from "../../../shared/services/upload.service";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly URL: string=environment.url;
  private readonly URL_ROOT: string=environment.url_root;

  constructor(private http: HttpClient,private uploadService: UploadService,
              private localStorageService: LocalStorageService) { }

  getPublicEvents():Observable<EventModel>{
    return this.http.get<EventModel>(`${this.URL}/events?populate=*&sort=createdAt:desc&filters[status][name]=publico`)
      .pipe(
        map(events=>{
          events.data.forEach(event=>{
            event.attributes.cover.data[0].attributes.url=this.URL_ROOT+event.attributes.cover.data[0].attributes.url;
          });
          return events
        })
      );
  }
}
