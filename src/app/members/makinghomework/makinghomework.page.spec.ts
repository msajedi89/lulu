import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakinghomeworkPage } from './makinghomework.page';

describe('MakinghomeworkPage', () => {
  let component: MakinghomeworkPage;
  let fixture: ComponentFixture<MakinghomeworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakinghomeworkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakinghomeworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
