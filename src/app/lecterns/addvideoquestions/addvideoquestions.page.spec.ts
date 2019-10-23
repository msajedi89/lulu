import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvideoquestionsPage } from './addvideoquestions.page';

describe('AddvideoquestionsPage', () => {
  let component: AddvideoquestionsPage;
  let fixture: ComponentFixture<AddvideoquestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvideoquestionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvideoquestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
