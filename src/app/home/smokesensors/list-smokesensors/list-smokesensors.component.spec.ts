import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSmokesensorsComponent } from './list-smokesensors.component';

describe('ListSmokesensorsComponent', () => {
  let component: ListSmokesensorsComponent;
  let fixture: ComponentFixture<ListSmokesensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSmokesensorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSmokesensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
