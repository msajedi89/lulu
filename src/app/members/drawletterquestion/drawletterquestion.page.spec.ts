import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawletterquestionPage } from './drawletterquestion.page';

describe('DrawletterquestionPage', () => {
  let component: DrawletterquestionPage;
  let fixture: ComponentFixture<DrawletterquestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawletterquestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawletterquestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
