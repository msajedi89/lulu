import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasDrawPage } from './canvas-draw.page';

describe('CanvasDrawPage', () => {
  let component: CanvasDrawPage;
  let fixture: ComponentFixture<CanvasDrawPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasDrawPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasDrawPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
