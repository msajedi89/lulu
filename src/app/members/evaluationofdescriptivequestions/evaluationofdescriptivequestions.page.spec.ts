import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationofdescriptivequestionsPage } from './evaluationofdescriptivequestions.page';

describe('EvaluationofdescriptivequestionsPage', () => {
  let component: EvaluationofdescriptivequestionsPage;
  let fixture: ComponentFixture<EvaluationofdescriptivequestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationofdescriptivequestionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationofdescriptivequestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
