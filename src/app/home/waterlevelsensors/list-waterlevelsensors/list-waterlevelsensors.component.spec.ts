import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWaterlevelsensorsComponent } from './list-waterlevelsensors.component';

describe('ListWaterlevelsensorsComponent', () => {
  let component: ListWaterlevelsensorsComponent;
  let fixture: ComponentFixture<ListWaterlevelsensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWaterlevelsensorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWaterlevelsensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
