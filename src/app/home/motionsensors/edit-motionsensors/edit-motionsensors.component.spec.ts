import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMotionsensorsComponent } from './edit-motionsensors.component';

describe('EditMotionsensorsComponent', () => {
  let component: EditMotionsensorsComponent;
  let fixture: ComponentFixture<EditMotionsensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMotionsensorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMotionsensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
