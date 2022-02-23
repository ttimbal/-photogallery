import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  options:any[] = [];
  routerObserver$!: Subscription;

  constructor(private router: Router, private localStorageService:LocalStorageService) {
    this.changeOptions();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routerObserver$.unsubscribe();
  }
  changeOptions() {
    this.routerObserver$=this.router.events.subscribe((event => {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/auth')) {
          this.optionsAuth(event.url);
        } else {
          this.optionsMain();
        }
      }
    }));
  }

  optionsMain() {
    this.options = [
      {
        name: 'inicio',
        route: ['/']
      },
      {
        name: 'eventos',
        route: ['/', 'events']
      },
      {
        name: 'fotos',
        route: ['/', 'photos']
      },
      {
        name: 'carrito',
        route: ['/', 'cart']
      },
      {
        name: 'salir',
        route: ['/','auth', 'logout']
      },
    ];
  }

  optionsAuth(url: string) {
    if (url === '/auth/register')
      this.options = [
        {
          name: 'Acceder',
          route: ['/', 'auth', 'login']
        }
      ];
    else {
      this.options = [
        {
          name: 'Registrarme',
          route: ['/', 'auth', 'register']
        }
      ];
    }
  }

  clicked(name:string) {
    if (name === 'salir'){
      this.localStorageService.clear();
      this.router.navigate(['/','auth','login']);
    }
  }
}
