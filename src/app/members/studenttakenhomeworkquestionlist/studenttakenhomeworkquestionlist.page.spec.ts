import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenttakenhomeworkquestionlistPage } from './studenttakenhomeworkquestionlist.page';

describe('StudenttakenhomeworkquestionlistPage', () => {
  let component: StudenttakenhomeworkquestionlistPage;
  let fixture: ComponentFixture<StudenttakenhomeworkquestionlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenttakenhomeworkquestionlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenttakenhomeworkquestionlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
