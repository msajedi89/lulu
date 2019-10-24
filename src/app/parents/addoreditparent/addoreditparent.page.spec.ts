import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditparentPage } from './addoreditparent.page';

describe('AddoreditparentPage', () => {
  let component: AddoreditparentPage;
  let fixture: ComponentFixture<AddoreditparentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddoreditparentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddoreditparentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
