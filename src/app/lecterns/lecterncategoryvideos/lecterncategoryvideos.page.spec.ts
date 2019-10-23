import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecterncategoryvideosPage } from './lecterncategoryvideos.page';

describe('LecterncategoryvideosPage', () => {
  let component: LecterncategoryvideosPage;
  let fixture: ComponentFixture<LecterncategoryvideosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecterncategoryvideosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecterncategoryvideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
