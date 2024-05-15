import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthorityComponent } from './add-authority.component';

describe('AddAuthorityComponent', () => {
  let component: AddAuthorityComponent;
  let fixture: ComponentFixture<AddAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAuthorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
