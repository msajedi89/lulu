import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsubtitlePage } from './editsubtitle.page';

describe('EditsubtitlePage', () => {
  let component: EditsubtitlePage;
  let fixture: ComponentFixture<EditsubtitlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsubtitlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsubtitlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
