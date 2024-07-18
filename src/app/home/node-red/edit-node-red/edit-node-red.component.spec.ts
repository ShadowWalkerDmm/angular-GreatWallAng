import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNodeRedComponent } from './edit-node-red.component';

describe('EditNodeRedComponent', () => {
  let component: EditNodeRedComponent;
  let fixture: ComponentFixture<EditNodeRedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNodeRedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNodeRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
