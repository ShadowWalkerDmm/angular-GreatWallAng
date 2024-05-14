import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMotionsensorsComponent } from './add-motionsensors.component';

describe('AddMotionsensorsComponent', () => {
  let component: AddMotionsensorsComponent;
  let fixture: ComponentFixture<AddMotionsensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMotionsensorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMotionsensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
