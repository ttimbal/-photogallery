import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {UserJwtModel} from "../../../core/models/user/user-jwt.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL: string=environment.url;

  constructor(private http: HttpClient) { }

  login(values:any) : Observable<UserJwtModel>{
    return this.http.post<UserJwtModel>(this.URL+'/auth/local',values);
  }
  register(values:any) : Observable<UserJwtModel>{
    return this.http.post<UserJwtModel>(this.URL+'/auth/local/register',values);
  }
}
