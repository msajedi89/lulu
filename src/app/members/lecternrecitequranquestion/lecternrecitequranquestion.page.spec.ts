import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecternrecitequranquestionPage } from './lecternrecitequranquestion.page';

describe('LecternrecitequranquestionPage', () => {
  let component: LecternrecitequranquestionPage;
  let fixture: ComponentFixture<LecternrecitequranquestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecternrecitequranquestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecternrecitequranquestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
