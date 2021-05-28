import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStrmingComponent } from './live-strming.component';

describe('LiveStrmingComponent', () => {
  let component: LiveStrmingComponent;
  let fixture: ComponentFixture<LiveStrmingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveStrmingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveStrmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
