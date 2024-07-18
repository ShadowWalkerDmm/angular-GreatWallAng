import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNodeRedComponent } from './list-node-red.component';

describe('ListNodeRedComponent', () => {
  let component: ListNodeRedComponent;
  let fixture: ComponentFixture<ListNodeRedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNodeRedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNodeRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
