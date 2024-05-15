import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuthorityComponent } from './list-authority.component';

describe('ListAuthorityComponent', () => {
  let component: ListAuthorityComponent;
  let fixture: ComponentFixture<ListAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAuthorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
