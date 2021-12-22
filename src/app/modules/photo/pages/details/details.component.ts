import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {DataPhotoModel} from "../../../../core/models/photos/data-photo.model";
import { PhotoService } from '../../services/photo.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy {
  Object = Object;
  photoId: number = 0;
  photo!:DataPhotoModel;
  listObservers$:Subscription[]=[];
  constructor(private photoService: PhotoService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const routerObserver$=this.activatedRoute.params.subscribe(params => {
      this.photoId = Number(params.id);
    });

    const photoObserver$=this.photoService.findPhoto(this.photoId).subscribe(
      res => this.photo=res
    );

    this.listObservers$.push(routerObserver$);
    this.listObservers$.push(photoObserver$);
  }

  ngOnDestroy() :void{
    this.listObservers$.forEach(u=>u.unsubscribe());
  }

  addToCart(){
    this.photoService.addToCart(this.photoId);
  }

}
