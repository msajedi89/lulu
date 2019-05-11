import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationofdragtotablequestionPage } from './evaluationofdragtotablequestion.page';

describe('EvaluationofdragtotablequestionPage', () => {
  let component: EvaluationofdragtotablequestionPage;
  let fixture: ComponentFixture<EvaluationofdragtotablequestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationofdragtotablequestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationofdragtotablequestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
