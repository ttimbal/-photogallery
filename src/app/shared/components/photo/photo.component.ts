import {Component, Input, OnInit} from '@angular/core';
import {DataImageModel} from "../../../core/models/images/data-image.model";
import {DataPhotoModel} from "../../../core/models/photos/data-photo.model";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  @Input() photo!:DataPhotoModel;
  constructor() { }

  ngOnInit(): void {
  }

}
