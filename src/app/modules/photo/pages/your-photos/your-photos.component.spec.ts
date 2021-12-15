import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPhotosComponent } from './your-photos.component';

describe('YourPhotosComponent', () => {
  let component: YourPhotosComponent;
  let fixture: ComponentFixture<YourPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
