import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Directive({
  selector: '[appImageControl]'
})
export class ImageControlDirective implements OnInit {

  @Input() appImageControl='';
  private readonly URL_ROOT: string=environment.url_root;


  @HostListener('error') onMouseEnter() {
  }

  constructor(private el: ElementRef) {
    console.log(el.nativeElement.src)
  }

  ngOnInit() {
    console.log(this.el.nativeElement.src.split('/'))
    /*this.el.nativeElement.src=this.URL_ROOT+this.appImageControl;
    console.log(this.el.nativeElement.src)*/
  }

}
