import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import {environment} from "../../../../../environments/environment";
import {LocalStorageService} from "ngx-webstorage";
import {CartService} from "../../services/cart.service";
import * as JSZip from "jszip";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  stripe!: Stripe | null;
  card: any;
  @Input() price: number = 0;
  @Input() photos: number[] = [];
  @Input() urls: any[] = [];
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter(false);

  constructor(private localStorageService: LocalStorageService, private cartService: CartService) {
  }

  async ngOnInit() {
    this.stripe = await loadStripe(environment.strapi_key);
    if (this.stripe) {
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card');

      this.card.on('change', (event: any) => {
        const displayError = document.getElementById('card-errors');
        if (displayError)
          event.error ? displayError.textContent = event.error.message : displayError.textContent = '';
      });
    }
  }

  async pay() {
    const user = this.localStorageService.retrieve('user');
    const ownerInfo = {
      owner: {name: user.username},
      amount: this.price * 100,
      currency: 'USD'
    };
    try {
      const result = await this.stripe?.createSource(this.card, ownerInfo);
      console.log(result)
      this.cartService.chargedPayment(user.id, this.photos, this.price);
      await this.downloadImages()
      this.close();
    } catch (e) {
      //notificar
      console.log(e)
    }

  }

  close() {
    this.closeEvent.emit(true);
  }

  async downloadImages() {
    const zip = new JSZip();
    for (let i = 0; i < this.urls.length; i++) {
      const img = zip.folder(i.toString());

      const data = this.urls[i];
      if (img) {
        if (data.url) {
          const imageBlob = await fetch(data.url,{mode: 'no-cors'}).then(response => response.blob());

          const imgData = new File([imageBlob], 'original.jpg');
          img.file('original.jpg', imgData, {base64: true});
        }
        if (data.formats.large) {
          const imageBlob = await fetch(data.formats.large,{mode: 'no-cors'}).then(response => response.blob());
          const imgData = new File([imageBlob], 'large.jpg');
          img.file('large.jpg', imgData, {base64: true});
        }
        if (data.formats.medium) {
          const imageBlob = await fetch(data.formats.medium,{mode: 'no-cors'}).then(response => response.blob());
          const imgData = new File([imageBlob], 'medium.jpg');
          img.file('medium.jpg', imgData, {base64: true});
        }
        if (data.formats.small) {
          const imageBlob = await fetch(data.formats.small,{mode: 'no-cors'}).then(response => response.blob());
          const imgData = new File([imageBlob], 'small.jpg');
          img.file('small.jpg', imgData, {base64: true});
        }
        if (data.formats.thumbnail) {
          const imageBlob = await fetch(data.formats.thumbnail,{mode: 'no-cors'}).then(response => response.blob());
          const imgData = new File([imageBlob], 'thumbnail.jpg');
          img.file('thumbnail.jpg', imgData, {base64: true});
        }
      }

      zip.generateAsync({type: "blob"}).then(function (content) {
        saveAs(content, "fotos.zip");
      });
    }
  }
}
