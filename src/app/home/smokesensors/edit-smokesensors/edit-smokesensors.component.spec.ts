import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSmokesensorsComponent } from './edit-smokesensors.component';

describe('EditSmokesensorsComponent', () => {
  let component: EditSmokesensorsComponent;
  let fixture: ComponentFixture<EditSmokesensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSmokesensorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSmokesensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
