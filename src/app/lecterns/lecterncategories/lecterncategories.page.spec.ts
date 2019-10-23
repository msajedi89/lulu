import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecterncategoriesPage } from './lecterncategories.page';

describe('LecterncategoriesPage', () => {
  let component: LecterncategoriesPage;
  let fixture: ComponentFixture<LecterncategoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecterncategoriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecterncategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
