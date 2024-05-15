import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoorhistoriqueComponent } from './edit-doorhistorique.component';

describe('EditDoorhistoriqueComponent', () => {
  let component: EditDoorhistoriqueComponent;
  let fixture: ComponentFixture<EditDoorhistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDoorhistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDoorhistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
