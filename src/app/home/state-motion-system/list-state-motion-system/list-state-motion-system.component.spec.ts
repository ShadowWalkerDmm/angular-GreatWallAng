import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStateMotionSystemComponent } from './list-state-motion-system.component';

describe('ListStateMotionSystemComponent', () => {
  let component: ListStateMotionSystemComponent;
  let fixture: ComponentFixture<ListStateMotionSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStateMotionSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStateMotionSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
