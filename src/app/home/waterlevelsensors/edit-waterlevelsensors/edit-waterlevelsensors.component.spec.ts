import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWaterlevelsensorsComponent } from './edit-waterlevelsensors.component';

describe('EditWaterlevelsensorsComponent', () => {
  let component: EditWaterlevelsensorsComponent;
  let fixture: ComponentFixture<EditWaterlevelsensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWaterlevelsensorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWaterlevelsensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
