import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemaintitlePage } from './managemaintitle.page';

describe('ManagemaintitlePage', () => {
  let component: ManagemaintitlePage;
  let fixture: ComponentFixture<ManagemaintitlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagemaintitlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagemaintitlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
