import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWindowstatusComponent } from './edit-windowstatus.component';

describe('EditWindowstatusComponent', () => {
  let component: EditWindowstatusComponent;
  let fixture: ComponentFixture<EditWindowstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWindowstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWindowstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
