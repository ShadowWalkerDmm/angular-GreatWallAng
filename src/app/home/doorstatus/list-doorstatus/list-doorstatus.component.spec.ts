import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDoorstatusComponent } from './list-doorstatus.component';

describe('ListDoorstatusComponent', () => {
  let component: ListDoorstatusComponent;
  let fixture: ComponentFixture<ListDoorstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDoorstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDoorstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
