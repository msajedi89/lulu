import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportexamprogressPage } from './reportexamprogress.page';

describe('ReportexamprogressPage', () => {
  let component: ReportexamprogressPage;
  let fixture: ComponentFixture<ReportexamprogressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportexamprogressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportexamprogressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
