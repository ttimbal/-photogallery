import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const jwt = this.localStorageService.retrieve('jwt');
    if (jwt !== undefined && jwt) return true;
    else {
      this.router.navigate(['/', 'auth', 'login']);
      return false;
    }
  }

}
