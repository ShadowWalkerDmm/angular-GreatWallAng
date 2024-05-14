import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoorstatusComponent } from './edit-doorstatus.component';

describe('EditDoorstatusComponent', () => {
  let component: EditDoorstatusComponent;
  let fixture: ComponentFixture<EditDoorstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDoorstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDoorstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
