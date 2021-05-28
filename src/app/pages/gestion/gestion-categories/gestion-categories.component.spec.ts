import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCategoriesComponent } from './gestion-categories.component';

describe('GestionCategoriesComponent', () => {
  let component: GestionCategoriesComponent;
  let fixture: ComponentFixture<GestionCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
