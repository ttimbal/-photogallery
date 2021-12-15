import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../services/event.service";
import {Observable, of, Subscription} from "rxjs";
import {EventModel} from "../../../../core/models/event/event.model";
import {DataEventModel} from "../../../../core/models/event/data-event.model";
import {DataUserModel} from "../../../../core/models/user/data-user.model";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  create:boolean = false;
  edit:boolean = false;
  delete:boolean = false;
  member={
    add:false,
    show:false,
    delete:false,
  }

  cover: string ='';
  eventForm:FormGroup=new FormGroup({});
  memberForm:FormGroup=new FormGroup({});

  listObservers$:Subscription[]=[];
  events$:Observable<EventModel> = of();
  selectedEvent!:DataEventModel;
  members!:DataUserModel[];
  selectedMember!:DataUserModel;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.events$= this.eventService.getEvents();
    this.memberForm = new FormGroup({
      identifier: new FormControl('',Validators.required)
    });

    this.eventForm = new FormGroup({
      cover: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      status: new FormControl('1', Validators.required)
    })
  }

  close() {
    this.create=false;
    this.edit=false;
    this.delete=false;
    this.eventForm.reset();
  }

  change($event: any) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.eventForm.controls['cover'].setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.cover = reader.result?.toString() || '';
      }
    }
  }

  submit() {
    if(this.create) this.eventService.createEvent(this.eventForm.value);
    if(this.edit) this.eventService.update(this.selectedEvent.id,this.eventForm.value);
    this.close();
  }

  prepareEdit(event:DataEventModel) {
    this.selectedEvent=event;
    this.eventForm.controls['cover'].removeValidators(Validators.required)
    this.eventForm.controls['name'].setValue(event?.attributes?.name);
    this.eventForm.controls['description'].setValue(event?.attributes?.description);
    this.eventForm.controls['date'].setValue(event?.attributes?.date);
    this.eventForm.controls['status'].setValue(event?.attributes?.status.data.id.toString());
    this.cover=event?.attributes?.cover?.data[0].attributes.url;
    this.edit=true;
    this.members=event?.attributes?.members?.data;
  }

  deleteEvent() {
    this.eventService.delete(this.selectedEvent.id);
    this.close();
  }

  addMember() {
    console.log(this.memberForm.value)
    this.eventService.addMember(this.selectedEvent.id,this.memberForm.value);
    this.member.add=false;
  }
  deleteMember() {
    this.eventService.deleteMember(this.selectedEvent.id,this.selectedMember.id);
    this.member.delete=false;
  }
}
