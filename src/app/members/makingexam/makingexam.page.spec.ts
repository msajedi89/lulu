import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakingexamPage } from './makingexam.page';

describe('MakingexamPage', () => {
  let component: MakingexamPage;
  let fixture: ComponentFixture<MakingexamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakingexamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakingexamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
