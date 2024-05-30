import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWindowhistoriqueComponent } from './edit-windowhistorique.component';

describe('EditWindowhistoriqueComponent', () => {
  let component: EditWindowhistoriqueComponent;
  let fixture: ComponentFixture<EditWindowhistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWindowhistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWindowhistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
