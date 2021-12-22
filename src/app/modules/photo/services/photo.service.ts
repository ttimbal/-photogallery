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
import {YourPhotoModel} from "../../../core/models/photos/your-photo.model";
import {DataPhotoModel} from "../../../core/models/photos/data-photo.model";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly URL: string=environment.url;

  private refresh$ = new BehaviorSubject<boolean>(true);


  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private uploadService: UploadService) {

  }
  private refresh(): void {
    this.refresh$.next(true);
  }
  photosFromEvent(event:number): Observable<PhotoModel> {
    return this.refresh$.pipe(switchMap(_ => this.loadPhotosFromEvent(event)));
  }
  yourPhotos(): Observable<YourPhotoModel> {
    return this.refresh$.pipe(switchMap(_ => this.loadYourPhotos()));
  }

  myEvents():Observable<EventModel>{
    const user=this.localStorageService.retrieve('user');
    return this.http.get<EventModel>(`${this.URL}/events/my-events?user=${user.id}`);
  }



  loadYourPhotos():Observable<YourPhotoModel>{
    const user=this.localStorageService.retrieve('user');
    return this.http.get<YourPhotoModel>(`${this.URL}/your-photos?populate[photo][populate][image]=*&filters[user][id]=${user.id}&sort=createdAt:desc`)
      .pipe(
        map(photos => {
          /*photos.data.forEach(photo=>{
            photo.attributes.photo.data.attributes.image.data.attributes.url=this.URL_ROOT+photo.attributes.photo.data.attributes.image.data.attributes.url
          });*/
          return photos;
        })
      );
  }

  loadPhotosFromEvent(event:number):Observable<PhotoModel>{
    const user=this.localStorageService.retrieve('user');
    return this.http.get<PhotoModel>(`${this.URL}/photos/event?user=${user.id}&event=${event}`)
      .pipe(
        map(photos => {
        /*  photos.data.forEach(photo=>{
            photo.attributes.image.data.attributes.url=this.URL_ROOT+photo.attributes.image.data.attributes.url
          });*/
          return photos;
        })
      );
  }

  uploadPhotos(values: any,files:File[]){
    const user=this.localStorageService.retrieve('user');
    values.photographer=user.id;

    this.uploadService.uploadMultipleImage(files).subscribe(
      res=>{
        const data:any[]=[];
        res.forEach((image) => {
          const copy = {...values};
          copy.image=image.id;
          copy.url=image.url;
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

  findPhoto(photoId:number):Observable<DataPhotoModel>{
    return this.http.get<DataPhotoModel>(`${this.URL}/photos/${photoId}`)
      .pipe(
        map(photo => {
         // photo.attributes.image.data.attributes.url=this.URL_ROOT+photo.attributes.image.data.attributes.url;
          return photo;
        })
      );
  }
  addToCart(photoId:number){
    const user=this.localStorageService.retrieve('user');
    const values={
      data:{
        user:user.id,
        photo:photoId
      }
    }
    this.http.post<any>(`${this.URL}/carts`,values).subscribe(
      res =>console.log(res),
      err =>console.log(err)
    );
  }




}
