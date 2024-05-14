import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaterlevelsensorsComponent } from './add-waterlevelsensors.component';

describe('AddWaterlevelsensorsComponent', () => {
  let component: AddWaterlevelsensorsComponent;
  let fixture: ComponentFixture<AddWaterlevelsensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWaterlevelsensorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWaterlevelsensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
