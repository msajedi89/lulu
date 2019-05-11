import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofstudenthomeworksPage } from './listofstudenthomeworks.page';

describe('ListofstudenthomeworksPage', () => {
  let component: ListofstudenthomeworksPage;
  let fixture: ComponentFixture<ListofstudenthomeworksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListofstudenthomeworksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofstudenthomeworksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
