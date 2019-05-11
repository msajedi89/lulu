import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesubtitlePage } from './managesubtitle.page';

describe('ManagesubtitlePage', () => {
  let component: ManagesubtitlePage;
  let fixture: ComponentFixture<ManagesubtitlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesubtitlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesubtitlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
