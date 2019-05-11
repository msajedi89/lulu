import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmaintitlePage } from './editmaintitle.page';

describe('EditmaintitlePage', () => {
  let component: EditmaintitlePage;
  let fixture: ComponentFixture<EditmaintitlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmaintitlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmaintitlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
