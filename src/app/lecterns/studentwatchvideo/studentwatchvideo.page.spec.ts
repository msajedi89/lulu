import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentwatchvideoPage } from './studentwatchvideo.page';

describe('StudentwatchvideoPage', () => {
  let component: StudentwatchvideoPage;
  let fixture: ComponentFixture<StudentwatchvideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentwatchvideoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentwatchvideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
