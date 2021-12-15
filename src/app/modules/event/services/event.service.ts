import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UploadService} from "../../../shared/services/upload.service";
import {LocalStorageService} from "ngx-webstorage";
import {Observable} from "rxjs";
import {EventModel} from "../../../core/models/event/event.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventService {
private readonly URL: string=environment.url;
private readonly URL_ROOT: string=environment.url_root;

  constructor(private http: HttpClient,private uploadService: UploadService,
  private localStorageService: LocalStorageService) { }

  getEvents():Observable<EventModel>{
    return this.http.get<EventModel>(`${this.URL}/events?populate=*&sort=createdAt:desc`)
      .pipe(
        map(events=>{
          events.data.forEach(event=>{
            event.attributes.cover.data[0].attributes.url=this.URL_ROOT+event.attributes.cover.data[0].attributes.url;
          });
          return events
        })
      );
  }

  createEvent(values: any){
    const uploadObserver$=this.uploadService.uploadImage(values.cover).subscribe(
      res => {
        values.cover = res[0].id
        values.user=this.localStorageService.retrieve('user').id;
        values={
          data:{
            ...values
          }
        }
        this.http.post<EventModel>(`${this.URL}/events`,values).subscribe(
          res=>{
            console.log(res)},
          err=>{
            console.log(err)},
        )
      },
      error => console.error(error)
    );
  }

  delete(id: number) {
    this.http.delete<EventModel>(`${this.URL}/events/${id}`).subscribe(
      res=>{
        console.log(res)
      },
      err => {
        console.log(err)}
    )
  }

  update(id: number, values: any) {
    console.log(values.cover)
    if(values.cover instanceof File) this.updateWithImage(id,values);
    else {
      delete values.cover;
      values={
        data:{
          ...values
        }
      }
      this.http.put<EventModel>(`${this.URL}/events/${id}`,values).subscribe(
        res=>{
          console.log(res)},
        err=>{
          console.log(err)},
      );
    }
  }

  updateWithImage(id:number,values: any){
    this.uploadService.uploadImage(values.cover).subscribe(
      res => {
        values.cover = res[0].id
        values={
          data:{
            ...values
          }
        }
        this.http.put<EventModel>(`${this.URL}/events/${id}`,values).subscribe(
          res=>{
            console.log(res)},
          err=>{
            console.log(err)},
        )
      },
      error => console.error(error)
    );
  }

  addMember(id: number, identifier: any) {
    this.http.put<EventModel>(`${this.URL}/events/${id}/add-member`,{...identifier}).subscribe(
      res=>{
        console.log(res)},
      err=>{
        console.log(err)},
    );
  }
  deleteMember(id: number, memberId: number) {
    console.log(memberId)
    this.http.put<EventModel>(`${this.URL}/events/${id}/delete-member`,{userId: memberId}).subscribe(
      res=>{
        console.log(res)},
      err=>{
        console.log(err)},
    );
  }
}
