import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentdashPage } from './parentdash.page';

describe('ParentdashPage', () => {
  let component: ParentdashPage;
  let fixture: ComponentFixture<ParentdashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentdashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentdashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
