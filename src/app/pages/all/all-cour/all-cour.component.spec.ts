import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCourComponent } from './all-cour.component';

describe('AllCourComponent', () => {
  let component: AllCourComponent;
  let fixture: ComponentFixture<AllCourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
