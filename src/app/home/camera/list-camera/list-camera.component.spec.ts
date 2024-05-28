import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCameraComponent } from './list-camera.component';

describe('ListCameraComponent', () => {
  let component: ListCameraComponent;
  let fixture: ComponentFixture<ListCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCameraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
