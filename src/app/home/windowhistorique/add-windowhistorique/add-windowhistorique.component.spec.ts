import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWindowhistoriqueComponent } from './add-windowhistorique.component';

describe('AddWindowhistoriqueComponent', () => {
  let component: AddWindowhistoriqueComponent;
  let fixture: ComponentFixture<AddWindowhistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWindowhistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWindowhistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
