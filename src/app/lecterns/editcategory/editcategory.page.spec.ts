import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcategoryPage } from './editcategory.page';

describe('EditcategoryPage', () => {
  let component: EditcategoryPage;
  let fixture: ComponentFixture<EditcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
