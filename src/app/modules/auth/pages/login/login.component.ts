import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm:FormGroup = new FormGroup({});
  listObservers$:Subscription[]=[];

  constructor(private authService:AuthService, private cookieService: CookieService,
              private localStorageService:LocalStorageService,
              private router:Router) {
    this.localStorageService.clear('jwt');
    this.localStorageService.clear('user');
  }

  ngOnInit(): void {

    this.loginForm=new FormGroup({
      identifier:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',Validators.required)
    });
  }
  ngOnDestroy() :void{
    this.listObservers$.forEach(u=>u.unsubscribe())
  }
  login() {
    const loginObserver$ = this.authService.login(this.loginForm.value).subscribe(
      res=>{
          this.localStorageService.store('jwt',res.jwt);
          this.localStorageService.store('user',res.user);
          this.router.navigate(['/']);
      },
      err=>{
        console.log(err)
      }
    );
    this.listObservers$.push(loginObserver$);
  }
}
