import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {EventModel} from "../../../core/models/event/event.model";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {PhotoModel} from "../../../core/models/photos/photo.model";
import {UserModel} from "../../../core/models/user/user.model";
import {map, switchMap} from "rxjs/operators";
import {UploadService} from "../../../shared/services/upload.service";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly URL: string=environment.url;
  private readonly URL_ROOT: string=environment.url_root;

  private refresh$ = new BehaviorSubject<boolean>(true);

  user!:UserModel;

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private uploadService: UploadService) {
    this.user=this.localStorageService.retrieve('user');

  }
  private refresh(): void {
    this.refresh$.next(true);
  }
  photosFromEvent(event:number): Observable<PhotoModel> {
    return this.refresh$.pipe(switchMap(_ => this.loadPhotosFromEvent(event)));
  }

  myEvents():Observable<EventModel>{
    return this.http.get<EventModel>(`${this.URL}/events/my-events?user=${this.user.id}`);
  }

  loadPhotosFromEvent(event:number):Observable<PhotoModel>{
    return this.http.get<PhotoModel>(`${this.URL}/photos/event?user=${this.user.id}&event=${event}`)
      .pipe(
        map(photos => {
          photos.data.forEach(photo=>{
            photo.attributes.image.data.attributes.url=this.URL_ROOT+photo.attributes.image.data.attributes.url
          });
          return photos;
        })
      );
  }

  uploadPhotos(values: any,files:File[]){
    this.uploadService.uploadMultipleImage(files).subscribe(
      res=>{
        const data:any[]=[];
        res.forEach((image) => {
          const copy = {...values};
          copy.image=image.id;
          copy.url=this.URL_ROOT+image.url;
          data.push(copy);
        });

        this.http.post<any>(`${this.URL}/photos/upload`, {data:data}).subscribe(
          res=>this.refresh(),
          err=>console.log(err)
        );
      },
      err=>console.log(err)
    )
  }
}
