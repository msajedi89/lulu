import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherdashPage } from './teacherdash.page';

describe('TeacherdashPage', () => {
  let component: TeacherdashPage;
  let fixture: ComponentFixture<TeacherdashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherdashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherdashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
