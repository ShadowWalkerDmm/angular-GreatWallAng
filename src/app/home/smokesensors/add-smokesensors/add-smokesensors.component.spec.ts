import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmokesensorsComponent } from './add-smokesensors.component';

describe('AddSmokesensorsComponent', () => {
  let component: AddSmokesensorsComponent;
  let fixture: ComponentFixture<AddSmokesensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSmokesensorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSmokesensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
