import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoorhistoriqueComponent } from './add-doorhistorique.component';

describe('AddDoorhistoriqueComponent', () => {
  let component: AddDoorhistoriqueComponent;
  let fixture: ComponentFixture<AddDoorhistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoorhistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoorhistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
