import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStateMotionSystemComponent } from './edit-state-motion-system.component';

describe('EditStateMotionSystemComponent', () => {
  let component: EditStateMotionSystemComponent;
  let fixture: ComponentFixture<EditStateMotionSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStateMotionSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStateMotionSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
