import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamevaluationPage } from './examevaluation.page';

describe('ExamevaluationPage', () => {
  let component: ExamevaluationPage;
  let fixture: ComponentFixture<ExamevaluationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamevaluationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamevaluationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
