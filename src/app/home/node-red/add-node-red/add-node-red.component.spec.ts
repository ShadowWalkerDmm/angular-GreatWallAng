import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNodeRedComponent } from './add-node-red.component';

describe('AddNodeRedComponent', () => {
  let component: AddNodeRedComponent;
  let fixture: ComponentFixture<AddNodeRedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNodeRedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNodeRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
