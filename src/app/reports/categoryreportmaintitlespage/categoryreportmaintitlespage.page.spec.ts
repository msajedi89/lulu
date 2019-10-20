import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryreportmaintitlespagePage } from './categoryreportmaintitlespage.page';

describe('CategoryreportmaintitlespagePage', () => {
  let component: CategoryreportmaintitlespagePage;
  let fixture: ComponentFixture<CategoryreportmaintitlespagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryreportmaintitlespagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryreportmaintitlespagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
