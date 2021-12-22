import { Component, OnInit } from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {CartModel} from "../../../../core/models/cart/cart.model";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  Object=Object;
  cart!:CartModel;
  totalPrice=0;
  amount=0;
  payment=false;
  photos:number[]=[];
  urls:any[]=[];
  cart$:Observable<CartModel> =of();

  constructor(private cartService:CartService) { }
  async ngOnInit() {

    this.cartService.cart().subscribe(
      res => {
        this.amount = res.data.length;
        this.totalPrice = 0;
        this.photos.length = 0;
        this.cart = res;
        this.urls=[];
        res.data.forEach(item => {
          this.totalPrice += item.attributes.photo.data.attributes.cost;
          this.photos.push(item.attributes.photo.data.id);

          const formats={
            large:item.attributes.photo.data.attributes.image.data.attributes.formats?.large?.url,
            medium:item.attributes.photo.data.attributes.image.data.attributes.formats?.medium?.url,
            small:item.attributes.photo.data.attributes.image.data.attributes.formats?.small?.url,
            thumbnail:item.attributes.photo.data.attributes.image.data.attributes.formats?.thumbnail?.url,
          }
          const data={
            url: item.attributes.photo.data.attributes.image.data.attributes.url,
            formats:formats
          }
          //console.log(item.attributes.photo.data.attributes.image.data.attributes.formats)

          this.urls.push(data);
        });
      },
      err => console.log(err)
    );
  }

  remove(id: number) {
    this.cartService.remove(id);
  }


  removeAll() {
    this.cartService.removeAll();
  }
}
