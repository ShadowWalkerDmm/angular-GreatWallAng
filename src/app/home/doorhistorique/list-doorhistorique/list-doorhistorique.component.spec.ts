import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDoorhistoriqueComponent } from './list-doorhistorique.component';

describe('ListDoorhistoriqueComponent', () => {
  let component: ListDoorhistoriqueComponent;
  let fixture: ComponentFixture<ListDoorhistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDoorhistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDoorhistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
