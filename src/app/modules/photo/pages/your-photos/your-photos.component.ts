import { Component, OnInit } from '@angular/core';
import {PhotoService} from "../../services/photo.service";
import {Observable, of} from "rxjs";
import {YourPhotoModel} from "../../../../core/models/photos/your-photo.model";

@Component({
  selector: 'app-your-photos',
  templateUrl: './your-photos.component.html',
  styleUrls: ['./your-photos.component.css']
})
export class YourPhotosComponent implements OnInit {
  photos$:Observable<YourPhotoModel> = of();

  constructor(private photoService:PhotoService) {
  }

  ngOnInit(): void {
    this.photos$=this.photoService.yourPhotos();
  }

}
