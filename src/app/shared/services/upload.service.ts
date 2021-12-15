import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ImageModel} from "../../core/models/images/image.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
 private readonly URL: string=environment.url;
  constructor(private http: HttpClient) { }

  uploadImage(image: any):Observable<ImageModel[]>{
    const formData=new FormData()
    formData.append('files',image)
    return this.http.post<ImageModel[]>(`${this.URL}/upload`,formData);
  }

  uploadMultipleImage(images: File[]):Observable<ImageModel[]>{
    const formData=new FormData()
    images.forEach((image=>{
      formData.append('files',image)
    }))
    return this.http.post<ImageModel[]>(`${this.URL}/upload?fields=url`,formData);
  }
}
