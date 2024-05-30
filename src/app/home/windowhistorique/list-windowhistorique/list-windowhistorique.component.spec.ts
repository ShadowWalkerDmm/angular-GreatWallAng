import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWindowhistoriqueComponent } from './list-windowhistorique.component';

describe('ListWindowhistoriqueComponent', () => {
  let component: ListWindowhistoriqueComponent;
  let fixture: ComponentFixture<ListWindowhistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWindowhistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWindowhistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
