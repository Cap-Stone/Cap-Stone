import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointPopoverComponent } from './point-popover.component';

describe('PointPopoverComponent', () => {
  let component: PointPopoverComponent;
  let fixture: ComponentFixture<PointPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
