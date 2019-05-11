import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationofrecitequranquestionsPage } from './evaluationofrecitequranquestions.page';

describe('EvaluationofrecitequranquestionsPage', () => {
  let component: EvaluationofrecitequranquestionsPage;
  let fixture: ComponentFixture<EvaluationofrecitequranquestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationofrecitequranquestionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationofrecitequranquestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
