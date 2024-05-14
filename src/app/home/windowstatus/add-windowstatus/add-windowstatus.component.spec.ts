import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWindowstatusComponent } from './add-windowstatus.component';

describe('AddWindowstatusComponent', () => {
  let component: AddWindowstatusComponent;
  let fixture: ComponentFixture<AddWindowstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWindowstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWindowstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
