import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "../../../core/models/user/user.model";
import {LocalStorageService} from "ngx-webstorage";
import {UploadService} from "../../../shared/services/upload.service";
import {CartModel} from "../../../core/models/cart/cart.model";
import {map, switchMap} from "rxjs/operators";
import {PhotoModel} from "../../../core/models/photos/photo.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly URL: string = environment.url;

  private refresh$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  private refresh(): void {
    this.refresh$.next(true);
  }
  cart(): Observable<CartModel> {
    return this.refresh$.pipe(switchMap(_ => this.loadCart()));
  }

  private loadCart(): Observable<any>{
    const user=this.localStorageService.retrieve('user');
    const query=`populate[photo][populate][image][populate][event]=*&populate[photo][populate][event]=*&filters[user][id]=${user.id}`;
    return this.http.get<CartModel>(`${this.URL}/carts?${query}`)
      .pipe(
        map(cart=>{
          console.log(cart)
 /*         cart.data.forEach(item=>{
            item.attributes.photo.data.attributes.image.data.attributes.url=this.URL_ROOT+item.attributes.photo.data.attributes.image.data.attributes.url;
          });*/
          return cart;
        })
      );
  }

  remove(id: number) {
    this.http.delete<any>(`${this.URL}/carts/${id}`).subscribe(
      res=>{
        console.log(res);
        this.refresh();
      },
      err=>console.log(err)
    );
  }

  removeAll() {
    const user=this.localStorageService.retrieve('user');
    this.http.delete<any>(`${this.URL}/carts?user=${user.id}`).subscribe(
      res=>{
        console.log(res);
        this.refresh();
      },
      err=>console.log(err)
    );
  }

  chargedPayment(userId:number,photos:number[],price:number) {
    const values={
      data:{
        user:userId,
        photos:photos,
        totalPrice:price,
        amount:photos.length
      }
    }
    this.http.post<any>(`${this.URL}/purchases`,values).subscribe(
      res=> {
        console.log(res);
        this.refresh();
      },
          err=>console.log(err)
    )
  }
}
