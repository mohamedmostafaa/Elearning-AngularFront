import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifRepComponent } from './certif-rep.component';

describe('CertifRepComponent', () => {
  let component: CertifRepComponent;
  let fixture: ComponentFixture<CertifRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
