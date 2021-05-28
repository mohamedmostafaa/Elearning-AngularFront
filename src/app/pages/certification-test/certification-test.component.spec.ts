import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationTestComponent } from './certification-test.component';

describe('CertificationTestComponent', () => {
  let component: CertificationTestComponent;
  let fixture: ComponentFixture<CertificationTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
