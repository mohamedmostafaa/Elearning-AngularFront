import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursTeacherComponent } from './edit-cours-teacher.component';

describe('EditCoursTeacherComponent', () => {
  let component: EditCoursTeacherComponent;
  let fixture: ComponentFixture<EditCoursTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoursTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoursTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
