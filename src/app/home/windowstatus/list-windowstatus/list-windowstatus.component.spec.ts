import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWindowstatusComponent } from './list-windowstatus.component';

describe('ListWindowstatusComponent', () => {
  let component: ListWindowstatusComponent;
  let fixture: ComponentFixture<ListWindowstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWindowstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWindowstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
