import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagestudentsPage } from './managestudents.page';

describe('ManagestudentsPage', () => {
  let component: ManagestudentsPage;
  let fixture: ComponentFixture<ManagestudentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagestudentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagestudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
