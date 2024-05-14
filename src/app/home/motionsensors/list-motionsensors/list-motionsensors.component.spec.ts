import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMotionsensorsComponent } from './list-motionsensors.component';

describe('ListMotionsensorsComponent', () => {
  let component: ListMotionsensorsComponent;
  let fixture: ComponentFixture<ListMotionsensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMotionsensorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMotionsensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
