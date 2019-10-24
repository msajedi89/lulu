import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageparentsPage } from './manageparents.page';

describe('ManageparentsPage', () => {
  let component: ManageparentsPage;
  let fixture: ComponentFixture<ManageparentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageparentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageparentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
