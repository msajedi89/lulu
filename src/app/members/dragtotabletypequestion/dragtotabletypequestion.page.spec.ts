import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragtotabletypequestionPage } from './dragtotabletypequestion.page';

describe('DragtotabletypequestionPage', () => {
  let component: DragtotabletypequestionPage;
  let fixture: ComponentFixture<DragtotabletypequestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragtotabletypequestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragtotabletypequestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
