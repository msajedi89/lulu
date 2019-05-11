import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationofdragdropquestionsPage } from './evaluationofdragdropquestions.page';

describe('EvaluationofdragdropquestionsPage', () => {
  let component: EvaluationofdragdropquestionsPage;
  let fixture: ComponentFixture<EvaluationofdragdropquestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationofdragdropquestionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationofdragdropquestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
