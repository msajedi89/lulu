import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofstudenttakenhomeworkPage } from './listofstudenttakenhomework.page';

describe('ListofstudenttakenhomeworkPage', () => {
  let component: ListofstudenttakenhomeworkPage;
  let fixture: ComponentFixture<ListofstudenttakenhomeworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListofstudenttakenhomeworkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofstudenttakenhomeworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
