import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UploadService} from "../../../../shared/services/upload.service";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  registerForm: FormGroup = new FormGroup({});
  image: string = ''
  listObservers$:Subscription[]=[];

  constructor(private authService: AuthService,
              private uploadService: UploadService,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      profilePhoto: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('3', Validators.required),
    })
  }
ngOnDestroy() :void{
    this.listObservers$.forEach(u=>u.unsubscribe())
}

  change($event: any) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.registerForm.controls['profilePhoto'].setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.image = reader.result?.toString() || '';
      }
    }
  }

  submit() {
    const values = this.registerForm.value;
    const uploadObserver$=this.uploadService.uploadImage(values.profilePhoto).subscribe(
      res => {
        values.profilePhoto = res[0].id
        this.register(values)
      },
      error => console.error(error)
    );
    this.listObservers$.push(uploadObserver$);
  }

  register(values: any) {
    const registerObserver$=this.authService.register(values).subscribe(
      res => {
        this.localStorageService.store('jwt', res.jwt);
        this.localStorageService.store('user', res.user);
        this.router.navigate(['/']);
      },
      err => console.log(err)
    );
    this.listObservers$.push(registerObserver$);
  }
}
