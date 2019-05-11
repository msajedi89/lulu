import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetitlesPage } from './managetitles.page';

describe('ManagetitlesPage', () => {
  let component: ManagetitlesPage;
  let fixture: ComponentFixture<ManagetitlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetitlesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetitlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
