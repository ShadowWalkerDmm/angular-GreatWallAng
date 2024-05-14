import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoorstatusComponent } from './add-doorstatus.component';

describe('AddDoorstatusComponent', () => {
  let component: AddDoorstatusComponent;
  let fixture: ComponentFixture<AddDoorstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoorstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoorstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
