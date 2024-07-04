import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStateMotionSystemComponent } from './add-state-motion-system.component';

describe('AddStateMotionSystemComponent', () => {
  let component: AddStateMotionSystemComponent;
  let fixture: ComponentFixture<AddStateMotionSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStateMotionSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStateMotionSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
