import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadlecternvideoPage } from './uploadlecternvideo.page';

describe('UploadlecternvideoPage', () => {
  let component: UploadlecternvideoPage;
  let fixture: ComponentFixture<UploadlecternvideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadlecternvideoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadlecternvideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
