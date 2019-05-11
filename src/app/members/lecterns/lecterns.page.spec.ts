import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecternsPage } from './lecterns.page';

describe('LecternsPage', () => {
  let component: LecternsPage;
  let fixture: ComponentFixture<LecternsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecternsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecternsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
