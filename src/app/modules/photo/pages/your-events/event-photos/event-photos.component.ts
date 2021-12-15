import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PhotoService} from "../../../services/photo.service";
import {PhotoModel} from "../../../../../core/models/photos/photo.model";
import {Observable, of} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SimpleEventService} from "../../../../../shared/services/simple-event.service";
import {UploadService} from "../../../../../shared/services/upload.service";


@Component({
  selector: 'app-event-photos',
  templateUrl: './event-photos.component.html',
  styleUrls: ['./event-photos.component.css']
})
export class EventPhotosComponent implements OnInit {

  eventId: number = 0;
  photos$: Observable<PhotoModel> = of();

  create: boolean = false;


  photoForm: FormGroup = new FormGroup({});
  images: string[] = [];
  files: File[] = [];

  constructor(private activatedRoute: ActivatedRoute
    , private photoService: PhotoService,
              private simpleEventService: SimpleEventService,
              private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.eventId = Number(params.id);
      this.photos$ = this.photoService.photosFromEvent(this.eventId);
    });

    this.photoForm = new FormGroup({
      cost: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });

    this.simpleEventService.createPhoto.subscribe(
      res => this.create = res
    )
  }

  close() {
    this.create = false;
    this.photoForm.reset();
    this.images=[];
    this.files=[];
  }

  change($event: any) {
      for (let i = 0; i < $event.target.files.length; i++) {
        const file = $event.target.files[i];
        if(this.existFile(file)) continue;
        this.files.push(file)
        this.photoForm.controls['image'].setValue(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          if (reader.result) this.images.push(reader.result?.toString());
        }
      }
      $event.target.value='';
  }

  existFile(file: File): boolean {
    let exist = false;
    this.files.forEach(f => {
      if (f.lastModified === file.lastModified &&
        f.name === file.name && f.size === file.size) exist = true;
    });
    return exist;
  }

  submit() {
    const values={
      event:this.eventId,
      cost:this.photoForm.controls['cost'].value
    }
    this.photoService.uploadPhotos(values,this.files);
    this.close();
  }

  removeFile(index:number) {
    this.images.splice(index,1);
    this.files.splice(index,1);
    if(this.files.length ===0) this.photoForm.controls['image'].reset();
  }
}
